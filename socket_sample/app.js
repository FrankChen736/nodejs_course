var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.set('view engine', 'ejs');

app.set('views', 'views');

app.get('/', function(req, res){
	res.render('index');
});

io.on('connection', function(socket){
	console.log('a user connected');
	io.emit('chat message', ' a user connected');
	socket.on('disconnect', function(){
		console.log('user disconnected');
		io.emit('chat message', ' a user disconnected');
	});
	socket.on('chat message', function(msg){
		console.log('message: ' + msg);
		io.emit('chat message', msg);
	})
});

http.listen(3000, function(){
	console.log('servre start at port :3000');
});
