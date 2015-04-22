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

var userAdapter = {};
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
				socket.name = msg;
				io.emit('chat message', {
					from: socket.name,
					content: '歡迎[' + socket.name + '] 來到這裡'
				});
				//userAdapter[socket.name] = adapter;
				userList.push(socket.name);
				io.emit('user list modify', userList);
			} else {
				socket.emit('chat message', {
					from: '系統',
					content: '請輸入你的暱稱'
				});
			}
		} else {

			io.emit('chat message', {
				from: socket.name,
				content: msg
			});
		}

		socket.on('disconnect', function() {
			console.log('user disconnected');
			userList.remove(socket.name);
			console.log(userList);
			io.emit('chat message', {
				from: '系統',
				content: socket.name + ' 已經離開了',
			})

			io.emit('user list modify', userList);
		});
	});
});

http.listen(3000, function() {
	console.log('servre start at port :3000');
});