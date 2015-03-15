var express = require('express');
var app = express();

//set template engine type
app.set('view engine', 'ejs');
//set template view default dirictory
app.set('views', __dirname + '/views');

function getDataList(){
	var i ;
	var list = [];
	for(i=1; i<=10; i++){
		list.push(getDataByID(i));
	}
	return list;
}

function getDataByID(id){
	return {
		id : id,
		title : 'Title is id:' + id + ' data',
		data : 'item ' + id + 'data',
	};
}

function staticFile(root)
{
	return function(req ,res ,next){
	console.log(root);
	console.log(req.baseUrl);
	console.log(req.path);
	res.send('hello');
	};
}

app.use('/public', staticFile(__dirname + '/public'));


app.get('/', function(req, res, next){	
	res.render('index.ejs', {
		list : getDataList(),
	});
});

app.get('/item/:id', function(req, res, next){
	res.render('item.ejs', {
		item : getDataByID(req.params.id),
	});
});


app.listen(3000);

console.log('Server Start at port 3000');