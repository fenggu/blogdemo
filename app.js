var express = require('express');
var app = express();
var ejs = require('ejs');
//bodyparser中间件 
var docRoute = require('./app/routes/blogs.js');
app.use('/v1/', docRoute);
app.use(express.static('build'));
app.use('*', (req, res) => {
    res.sendFile(__dirname + '/build/index.html')
})
var server = app.listen(8081, function() {
    var host = server.address().address;
    var port = server.address().port; 
})
