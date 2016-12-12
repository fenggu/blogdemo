var express=require('express');
var app=express(); 
var ejs = require('ejs');
 //bodyparser中间件 
var docRoute = require('./app/routes/doc.server.route.js');
// create application/x-www-form-urlencoded parser 
app.use('/', docRoute);
app.use(express.static('static'));  
app.set('view engine', 'ejs');
app.engine('.ejs', ejs.__express);  
var server=app.listen(8080,function(){
	var host=server.address().address;
	var port=server.address().port;
	console.log('Example app listening at http://%s:%s', host, port);
})