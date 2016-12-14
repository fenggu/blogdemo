var models=require('../models/doc.server.model');  
var mongoose=require('mongoose'); 
var util=require('util');   
var http = require('http');  
var Blog=models.Blog


function findList(req, res, next) { //查找是否已存在
  var promise = new mongoose.Promise();
  Blog.find({
    "pid": req.body.pid
  }, function(err, result) {
    promise.resolve(err, result);
  })
  return promise;
}

function RemoveBlog(req, res, next) { //删除
  var promise = new mongoose.Promise();
  Blog.remove({
    "pid": req.body.pid
  }, function(err, result) {
    promise.resolve(err, result); 
  })
  return promise;
}

function CreateBlog(req, res,next) {  //增加
  var promise = new mongoose.Promise();
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
          promise.resolve(err, res);
        }  
    }); 
    res.json(data)
    return promise;
  }
 
module.exports={  
  EditBlog:function(req,res,next){ //增加以及编辑的方法
    findList(req,res,next) 
    .then(RemoveBlog(req,res,next))
    .then(CreateBlog(req,res,next)) 
  },
   getBlog:function(req, res, next) { //获取单个Blog数据
   var data={} 
    Blog.find({
      "pid": req.param('pid')
    }, function(err, result) { 
      if(err){
        data.err=err
      }else{
        data.code=0
        data.data=result
        console.log(data.data)
      }

    res.json(data) 
    }) 
  }, 
   DelBlog:function(req, res, next) { //删除 
    var data={}
    Blog.remove({
      "pid": req.param('pid')
    }, function(err, result) { 
        if(err){
          data.error=err
        } else{
          data.code=0
          console.log(result)
        }
      res.json(data)
    })
  },
  getBlogList:function(req, res) { //返还Blog数组
    var data={};
     Blog.find({},null,{sort:{pid:-1}},function(err,result){
       if(err){
        console.log("Error:" + err);
        data.err=err
       }else{  
        var brr=[] 
        var page=parseInt(req.param('page')) 
        for(let i=0;i<3;i++){ 
          if(result[page*3+i]==undefined){
            continue
          }else{ 
            brr.push(result[page*3+i])
          }
        }
        data.data=brr;
        data.page=parseInt(req.param('page')) ;
        data.maxpage=Math.floor(result.length/3)
        result==""? data.lastpid=0 :data.lastpid=result[0].pid
        if(result.length%3==0){data.maxpage=data.maxpage-1} 
        data.code=0;
       }
      res.json(data) 
     })
  }
}