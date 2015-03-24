var express = require('express');
var cookie = require('cookie-parser');
var ejs = require('ejs');

var srvKey = require('./serverKey.js');
var session = require('./session.js');

var app = express();

app.set('view engine','ejs');
app.set('views','views');
app.use(cookie(srvKey.GetKey()));
//implement session in memory
app.use(session());

function checkLogin(req, res, next){
	if (req.session && req.session.username){
		next();
	} else{
		res.redirect('/');
	}
}

app.get('/', function(req, res, next){
	res.render('login.ejs');	
});

app.get('/login', function(req, res, next){
	console.log(req.query);
	req.session.username = req.query.username;
	res.redirect('/user');
});

app.get('/user', checkLogin, function(req, res, next){
	res.locals.username = req.session.username;
	res.render('user.ejs');
});

app.get('/logout', function(req, res, next){
	delete req.session.username;
	res.redirect('/');
})



app.listen(3000);
console.log('Node Server Start... on port 3000');
