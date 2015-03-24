var uuid = require('node-uuid');
var clone = require('clone');

module.exports = function () {
	var data = {};

	return function (req, res, next)
	{
		//console.log('session called');
		//console.log(req.signedCookies.session_id);

		var id = req.signedCookies.session_id || uuid.v4();


		res.cookie('session_id', id, {
			maxAge : 60000,
			httpOnly : true,
			signed : true,
			path : '/'
		});

		req.session = clone(data[id] || {});

		res.on('finish', function (){			
			data[id] = clone(req.session);
			//console.log(data);

		});

		next();
	}
}