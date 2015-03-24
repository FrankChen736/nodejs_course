var express = require('express');
var path = require('path');
var cookie = require('cookie-parser');
var ejs = require('ejs');

var srvKey = require('./serverKey.js');
//change to use express-session && connect-redis
var session = require('express-session');
var myStore = require('./myStore')(session);

var app = express();

app.set('view engine','ejs');
app.set('views','views');
//app.use(cookie(srvKey.GetKey()));
app.use(session({
	secret : srvKey.GetKey(),	
	store : new myStore(path.resolve(__dirname,'./sessions'))
	}));

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
	req.session.destroy();
	res.redirect('/');
})



app.listen(3000);
console.log('Node Server Start... on port 3000');
