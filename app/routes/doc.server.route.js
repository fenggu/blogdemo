var express=require('express');
var app=express();
var docController=require('../controllers/user.server.controller');
 //bodyparser中间件 
var bodyParser = require('body-parser') 
var jsonParser = bodyParser.json(); 
app.use(bodyParser()); 
app.use(bodyParser.urlencoded({extended:false})); 
app.post('/addblog',docController.CreateBlog)
module.exports = app;
