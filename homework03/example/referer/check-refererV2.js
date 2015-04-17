var url = require('url');
var path = require('path');

function check(whiteList){
	return function(req, res, next){
		var list = whiteList || [];
		//console.log(list);
		var referer = url.parse(req.headers.referer || req.headers.refeerer).host; 
		var host =req.headers.host;
		//console.log (referer);
		//console.log(list.indexOf(referer));
		if (referer === host){
			next();	
		} else if ( list.indexOf(referer) !== -1 ){
			next();
		} else {
			res.sendFile(path.resolve('./public/img/notfound.jpg'));
		}		
	}
}
module.exports = check;
