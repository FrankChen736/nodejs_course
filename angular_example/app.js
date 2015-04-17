var express = require('express');
var app = express();
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use('/public', express.static('public'));

app.get('/', function(req, res, next) {
	res.render('index');
})

app.listen(3000);
console.log('server started');