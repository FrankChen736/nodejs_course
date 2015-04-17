var express = require('express');
var userAgent = require('useragent');

var checkReferer = require('./check-refererV2.js');
var app = express();


app.set('view engine', 'ejs');
app.set('views', 'views');

app.use('/public', checkReferer(['localhost','one.frank.tw']));
app.use('/public',express.static('public'));

app.get('/', function(req, res, next){
	console.log(req.headers['accept-language']);

	res.render('index.ejs');
});

app.listen(80, function(){
	console.log('server start at port 80');
});

