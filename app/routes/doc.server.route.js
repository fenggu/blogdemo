var express=require('express');
var app=express();
var docController=require('../controllers/user.server.controller');
 //bodyparser中间件 
var bodyParser = require('body-parser') 
var jsonParser = bodyParser.json(); 
app.use(bodyParser()); 
app.use(bodyParser.urlencoded({extended:false})); 
app.post('/Blogs/blog',docController.EditBlog)
app.get('/Blogs/blog',docController.getBlog)
app.get('/Blogs',docController.getBlogList)
app.get('/Blogs/delblog',docController.DelBlog)
module.exports = app;
