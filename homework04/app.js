var express = require('express');
var app = express();
var vhost = require('./vhost');
var port = process.env.PORT || 3000;


app.use(vhost('1.frankchen.tw', require('./site1.js')));

app.use(vhost('2.frankchen.tw', require('./site2.js')));

app.use(function(req, res, next){
	res.send('Invalid host');
})

app.listen(port);
console.log('server on port ' + port);