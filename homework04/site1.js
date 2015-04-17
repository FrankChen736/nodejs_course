module.exports = function (){
	
	var router = require('express').Router();	
	router.use(function(req, res, next){
		console.log('site1 start...');
		next();
	})
	router.get('/', function(req, res){
		res.send('Site 1 hoem page');
	})

	router.get('/about', function(req, res){
		res.send('im the about page!');
	})
	
	router.use(function(req, res){
		res.send('page not found');
	})
	return router;	
}