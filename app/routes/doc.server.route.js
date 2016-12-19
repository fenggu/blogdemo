var express = require('express');
var app = express();
var docController = require('../controllers/doc.server.controller');
//bodyparser中间件 
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json();
app.use(bodyParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.post('/blogs/v1/blog', docController.editBlog)
app.get('/blogs/v1/blog/:pid', docController.getBlog)
app.delete('/blogs/v1/blog/:pid', docController.delBlog)
app.get('/blogs/v1/:page', docController.getBlogList)
module.exports = app;
