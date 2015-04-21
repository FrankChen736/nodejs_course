var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.set('view engine', 'ejs');

app.set('views', 'views');

app.get('/', function(req, res) {
	res.render('index');
});

io.on('connection', function(socket) {
	console.log('a user connected');

	console.log(socket.rooms);

	socket.emit('chat message', {
		from: '系統',
		content: '請輸入你的暱稱'
	});
	socket.on('chat message', function(msg) {
		if (!socket.name) {
			console.log(msg);
			if (msg) {
				socket.name = msg;
				io.emit('chat message', {
					from: socket.name,
					content: '歡迎[' + socket.name + '] 來到這裡'
				});
			} else {
				socket.emit('chat message', {
					from: '系統',
					content: '請輸入你的暱稱'
				});
			}
		} else {
			socket.broadcast.emit('chat message', {
				from: socket.name,
				content: msg
			});
		}

		socket.on('disconnect', function() {
			console.log('user disconnected');
			io.emit('chat message', {
				form: '系統',
				content: 'a user disconnected'
			});
		});
	});
});

http.listen(3000, function() {
	console.log('servre start at port :3000');
});