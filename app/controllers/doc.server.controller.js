var models=require('../models/doc.server.model');  
var mongoose=require('mongoose'); 
var util=require('util');
var fs=require('fs')
var Main=models.Main;
var Second=models.Second;
var User=models.User;
var http = require('http');
var querystring = require('querystring');
var request = require('request');
var listener={}

function findUser(req, res, next) { //查找是否已存在
  var promise = new mongoose.Promise();
  User.find({
    "uid": req.body.uid
  }, function(err, result) {
    promise.resolve(err, result);
  })
  return promise;
}
function RemoveUser(req, res, next) {
  var promise = new mongoose.Promise();
  User.remove({
    "uid": req.body.uid
  }, function(err, result) {
    promise.resolve(err, result); 
  })

  return promise;
}
function CreateUser(req, res,next) {  
  var data={}
    var  user=new User({    
      uid:req.body.uid, 
      time:req.body.time,
      pid:req.body.pid,
      answer:req.body.answer,
      detail:req.body.detail
    }) 
    user.save(function (err, result) {
        if (err) {
            console.log("Error:" + err);
        }
        else { 
  
        }

    });
     data.code=0
    res.send({"data":data}) 
  }
function findList(req, res, next) { //查找是否已存在
  var promise = new mongoose.Promise();
  Main.find({
    "pid": req.body.pid
  }, function(err, result) {
    promise.resolve(err, result);
  })
  return promise;
}

function RemoveMain(req, res, next) {
  var promise = new mongoose.Promise();
  Main.remove({
    "pid": req.body.pid
  }, function(err, result) {
    promise.resolve(err, result); 
  })

  return promise;
}

function RemoveSecond(req, res, next) {
  var promise = new mongoose.Promise();

  Second.remove({
    "pid": req.body.pid
  }, function(err, result) {
    promise.resolve(err, result);
  })
  return promise;
}
function Createmain(req, res,next) { 
  var promise = new mongoose.Promise();
    var  main=new Main({    
      title:req.body.title, 
      time:req.body.time,
      pid:req.body.pid,
      num:req.body.num
    }) 
    main.save(function (err, result) {
        if (err) {
            console.log("Error:" + err);
        }
        else { 

            promise.resolve(err, result);
        }

    });
    return promise;
  }
function CreateSencond(req, res,next) { 
    var data={};
    var  second=new Second({    
      pid:req.body.pid,
      title:req.body.title,
      question:req.body.question,
      ansdetext:req.body.ansdetext,
      ansdeqj:req.body.ansdeqj,
      jj:req.body.jj,
      pic:req.body.pic
    })  
    second.save(function (err, result) {
        if (err) {
            console.log("Error:" + err);
        }
        else { 
        }
        data.code=0
      res.send({"data":data}) 
    });
  } 
module.exports={
   listener:function (req, res) {   
    var method = req.method.toUpperCase();
    var proxy_url = 'http://www.51songguo.com/listener/commendTest';
    var options = {
          headers: {"Connection": "close"},
            url: proxy_url,
            method: method,
            json: true,
            body: req.body
    };

    function callback(error, response, data) {
        if (!error && response.statusCode == 200) {
            listener=data
            console.log('------接口数据------',listener);
           // res.json(listener)
           res.json(data)
        }
    }
    request(options, callback);
  }, 
  getlistener:function(req,res){
    res.json(listener)
  },
  renderTest:function(req, res) {
    var data={};
    var num=0;
    console.log(req.param('pid'))
     Second.findOne({"pid":req.param('pid')},function(err,result){
       if(err){
        console.log("Error:" + err);
       }else{  
            data=result
            User.find({},function(err,result){
              if(err){
                res.send(err)
              }else{ 
                 res.render('test', { data:data,usernum:result.length}) 
              }
            })
       }
     }) 
  },
  renderHome:function(req, res) {
    var data={};
    console.log(req.param('pid'))
     Second.findOne({"pid":req.param('pid')},function(err,result){
       if(err){
        console.log("Error:" + err);
       }else{  
            data=result
            User.find({},function(err,result){
              if(err){
                res.send(err)
              }else{ 
                 res.render('index', { data:data,usernum:result.length}) 
              }
            })
       }
     }) 
  },
  renderDetail:function(req,res,next){ 
    var data={}; 
    console.log(req.param('pid'))
     Second.findOne({"pid":req.param('pid')},function(err,result){
       if(err){
        console.log("Error:" + err);
       }else{  
            data=result
            User.find({},function(err,result){
              if(err){
                res.send(err)
              }else{ 
                 res.render('finish', { data:data,usernum:result.length}) 
              }
            })
       }
     }) 
  },
  getTest:function(req, res) {
    var data={};
     Second.findOne({"pid":req.body.pid},function(err,result){
       if(err){
        console.log("Error:" + err);
       }else{  
            data=result
       }
      res.send({data:data}) 
     })
  },
  getList:function(req, res) {
    var data={};
     Main.find({},function(err,result){
       if(err){
        console.log("Error:" + err);
       }else{  
            data=result
       }
      res.send({data:data}) 
     })
  },
  GetDetail:function(req,res,next){ 
  var data={} 
    Second.find({
      "pid": req.body.pid
    }, function(err, result) { 
      if(err){ console.log(err)}else{
        console.log(result)
      data=result
      }
    res.send({data:data}) 
    })
    
  },
  uploadfile(req,res,next){  
    console .log(req.files.pic[0].originalname); //JSON Object
    var name=req.files.pic[0].originalname
    var path="/user/images/"+name
    res.send({ 
      data:{
        path:path
      }
    })
  },
  RemoveTest:function(req,res,next){
    findList(req,res,next)
    .then(RemoveMain(req,res,next))
    .then(RemoveSecond(req,res,next))
  },
  CreateUser:function(req,res,next){
    findUser(req,res,next)
    .then(RemoveUser(req,res,next))
    .then(CreateUser(req,res,next))
  },
  CreateTest:function(req,res,next){ //promise
    findList(req,res,next)
    .then(RemoveMain(req,res,next))
    .then(RemoveSecond(req,res,next))
    .then(Createmain(req,res,next))
    .then(CreateSencond(req,res,next))
  }
}