var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.set('view engine', 'ejs');

app.set('views', 'views');

app.get('/', function(req, res) {
	res.render('index');
});

Array.prototype.remove = function() {
	var what, a = arguments,
		L = a.length,
		ax;
	while (L && this.length) {
		what = a[--L];
		while ((ax = this.indexOf(what)) !== -1) {
			this.splice(ax, 1);
		}
	}
	return this;
};

//all user socket set
var userAdapter = {};
//all user name list
var userList = [];

io.on('connection', function(socket) {
	console.log('user connected');

	socket.emit('chat message', {
		from: '系統',
		content: '請輸入你的暱稱'
	});
	io.emit('user list modify', userList);
	socket.on('chat message', function(msg) {
		if (!socket.name) {
			console.log(msg);
			if (msg) {
				socket.name = msg.message;
				io.emit('chat message', {
					from: socket.name,
					content: '歡迎[' + socket.name + '] 來到這裡',
					isPrivate: false,
				});
				userAdapter[socket.name] = socket;
				userList.push(socket.name);
				io.emit('user list modify', userList);
			} else {
				socket.emit('chat message', {
					from: '系統',
					content: '請輸入你的暱稱',
					isPrivate: false,
				});
			}
		} else {
			//public message
			if (!msg.to || msg.to.length == 0){
				io.emit('chat message', {
					from: socket.name,
					content: msg.message,
					isPrivate: false,}
				);				
			} else {
				//private message 
				msg.to.forEach(function(element, index, array){
					console.log('send privat message to ' + element);
					if (userAdapter[element]){
						userAdapter[element].emit('chat message',{
							from: socket.name,
							content: msg.message,
							isPrivate: true,});
						}
				});
			}			
		}

		socket.on('disconnect', function() {
			console.log('user disconnected');
			userList.remove(socket.name);
			console.log(userList);
			io.emit('chat message', {
				from: '系統',
				content: socket.name + ' 已經離開了',
				isPrivate: false,
			})

			io.emit('user list modify', userList);
		});
	});
});

http.listen(3000, function() {
	console.log('servre start at port :3000');
});