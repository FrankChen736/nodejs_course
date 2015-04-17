var url = require('url');

function checkReferer(req, res, next){
	console.log(req.app);
	next();
}

exports.checkReferer = checkReferer;