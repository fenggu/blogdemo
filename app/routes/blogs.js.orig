<<<<<<< HEAD
var express = require('express');
var app = express();
var docController = require('../controllers/blogs');
//bodyparser中间件 
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json();
=======
var app = require('express').Router(); 
var docController = require('../controllers/blogs');
//bodyparser中间件 
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json();   
>>>>>>> master
app.use(bodyParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.post('/blogs/blog', docController.editBlog)
app.get('/blogs/blog/:pid', docController.getBlog)
app.delete('/blogs/blog/:pid', docController.delBlog)
app.get('/blogs/:page', docController.getBlogList)
module.exports = app;
