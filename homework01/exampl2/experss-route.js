var express = require('express');
var app=express();

app.get('/item/:id/:name',function(req,res,next){
	res.json(req.params);
}
);

app.listen('3000');
