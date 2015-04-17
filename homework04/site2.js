module.exports = function (){

	var express = require('express');
	var router = express.Router();
	
	router.get('/', function(req, res){
		res.send('Site 2 home page');
	})

	router.get('/about', function(req, res){
		res.send('im the about page!');
	})
	

	router.use(function(req, res){
		res.send('page not found');
	})

	return router;	
}