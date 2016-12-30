var app = require('express').Router(); 
var docController = require('../controllers/blogs');
//bodyparser中间件 
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json();   
app.use(bodyParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.post('/blogs/blog', docController.editBlog)
app.post('/blogs/login', docController.login)
app.post('/blogs/sign', docController.addUser)
app.get('/blogs/blog/:pid', docController.getBlog)
app.delete('/blogs/blog/:pid', docController.delBlog)
app.get('/blogs/:page', docController.getBlogList)
app.post('/blogs', docController.searchBlog)
module.exports = app;
