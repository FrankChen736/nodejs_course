module.exports = function(config){

	var cfg ;
	//check config adapter type
	if (!config.adapter){
		throw {
			name: 'config type error',
			message: 'the config object need contain adapter property to assign adapter type',
		};
	}
	switch(config.adapter)
	{
		case : 'disk':
			break;
		default:
			throw {
			name: 'config type error',
			message: 'the config object need contain adapter property to assign adapter type',
			};		
	}
}