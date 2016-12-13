var models=require('../models/doc.server.model');  
var mongoose=require('mongoose'); 
var util=require('util');   
var http = require('http');  
var Blog=models.Blog
module.exports={ 
CreateBlog:function(req, res,next) {  
  var data={}
    var  blog=new Blog({    
      title:req.body.title, 
      date:req.body.date,
      pid:req.body.pid,
      comment:req.body.comment,
      content:req.body.content
    }) 
    blog.save(function (err, res) {
        if (err) { 
          data.err=err 
        }else { 
          data.code=0  
        }  
    }); 
      res.json(data)
  }
}