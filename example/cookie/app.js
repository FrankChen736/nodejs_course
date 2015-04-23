var express = require('express');
var credentials = require('./credentials.js');
var app = express();

app.use(require('cookie-parser')(credentials.cookieSecret));

app.get('/', function(req, res, netx){
	
	console.log(req.cookies);	
	res.cookie('monster', 'nom nom');
	res.cookie('signed_monster', 'nom nom', { signed: true});
	res.send('<h1>Hello World</h1>');
});

app.listen(3000);