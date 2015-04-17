var waterLine = require('waterline');
var diskAdapter = require('sails-disk');

var config = {
	adapters: {
		'default' : diskAdapter,
		disk : diskAdapter
	},
	connections: {
		myLocalDisk: {
			adapter: 'disk',
			filePath: './data/'
		}
	},
	defaults: {
		migrate: 'alter',
	}
};

var User = waterLine.Collection.extend({
	identity: 'user',
	connection: 'myLocalDisk',
	attributes: {
		first_name: 'string',
		last_name: 'string'
	}
});

var orm = new waterLine();

orm.loadCollection(User);

orm.initialize(config, function(err, models){
	if(err) throw err;

	models.collections.user.create({
		first_name: 'frank',
		last_name: 'chen'
	}, function(err, ret){
		if(err) throw err;

		console.log(ret);
		models.collections.user.find({}, console.log);
	});
});

