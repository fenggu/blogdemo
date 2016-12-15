var express=require('express');
var app=express();
var docController=require('../controllers/doc.server.controller');
 //bodyparser中间件 
var bodyParser = require('body-parser') 
var jsonParser = bodyParser.json(); 
app.use(bodyParser()); 
app.use(bodyParser.urlencoded({extended:false})); 
app.post('/blogs/blog',docController.EditBlog)
app.get('/blogs/blog/:pid',docController.getBlog)
app.get('/blogs/:page',docController.getBlogList)
app.delete('/blogs/blog/:pid',docController.DelBlog)
module.exports = app;
