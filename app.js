var express = require('express');
<<<<<<< HEAD
var app = express();
var ejs = require('ejs');
=======
var app = express(); 
>>>>>>> master
//bodyparser中间件 
var docRoute = require('./app/routes/blogs.js');
app.use('/v1/', docRoute);
app.use(express.static('build'));
app.use('*', (req, res) => {
    res.sendFile(__dirname + '/build/index.html')
})
<<<<<<< HEAD
var server = app.listen(8081, function() {
=======
var server = app.listen(8081, e => {
>>>>>>> master
    var host = server.address().address;
    var port = server.address().port; 
})
