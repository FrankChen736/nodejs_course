module.exports = function(host, router){	
	return function(req, res, next){
		var currentHost = req.headers.host.split(':')[0];
		//console.log(currentHost);
		if (currentHost === host){							
			router()(req, res, next);
		} else{
			next();	
		}
	}
}

