var express=require('express');
var app=express();
var docController=require('../controllers/doc.server.controller');
 //bodyparser中间件 
var bodyParser = require('body-parser') 
var jsonParser = bodyParser.json(); 
app.use(bodyParser()); 
app.use(bodyParser.urlencoded({extended:false})); 
app.post('/Blogs/blog',docController.EditBlog)
app.get('/Blogs/blog/:pid',docController.getBlog)
app.get('/Blogs/:page',docController.getBlogList)
app.delete('/Blogs/blog/:pid',docController.DelBlog)
module.exports = app;
