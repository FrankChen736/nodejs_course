var express = require('express');
var path = require('path');
var fs = require('fs');
var mime = require('mime-types');
var app = express();
var defaultPageName = 'index.html';


if (typeof String.prototype.startsWith !== 'function') {
	String.prototype.startsWith = function (str){
		return this.slice(0, str.length) === str;
	};
}

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
		//parse virtual path to physical path
		var file = __dirname + path.normalize(req.originalUrl);		
		//check physical file in the root directory
		if (!file.startsWith(root))
		{
			res.writeHead(403,{'Content-Type': 'text/plain'});
			res.end('error');
		}
		else
		{
			//send file and  set respsone mime type						
			fs.stat(file, function (err, stats){
				if (err){
					res.statusCode = 404;
					res.end();
				}
				else{
					//console.log(mime.lookup(fullFileName));
					res.setHeader("Content-Type", mime.lookup(file));
					var stm = fs.createReadStream(file);
					stm.pipe(res);		
				}				
			} );

		}
		
	};
}

app.use('/public', staticFile(__dirname + path.normalize('/public')));

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

//Check request originalUrl is Directory
app.use(function(req, res, next){
	 file = __dirname + path.normalize(req.originalUrl);
	 fs.stat(file, function(err, stats){
	 	if (err){
	 		console.log('err');
	 		next();
	 	}
	 	else{	 		
			if (!file.startsWith(__dirname))
			{
				res.writeHead(403,{'Content-Type': 'text/plain'});
				res.end('error');
			}//check request.original is directory
	 		else if(stats.isDirectory()){		 		 			
	 			var defaultPage = file + '\\' + defaultPageName;
	 			console.log(defaultPage);
	 			fs.exists(defaultPage, function (isExist){
	 				if (isExist){
	 					res.setHeader("Content-Type", mime.lookup(defaultPage));
	 					var stm = fs.createReadStream(defaultPage);
						stm.pipe(res);							
	 				}
	 				else{
	 					next();
	 				}
	 			});	 			
	 		}
	 	}
	 });
});

app.listen(3000);

console.log('Server Start at port 3000');