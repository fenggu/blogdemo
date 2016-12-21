var mongodb = require('mongodb').MongoClient;
var DB_CONN_STR = 'mongodb://localhost:27017/blogdemo' 

module.exports = {
    editBlog: function(req, res, next) { //增加以及编辑的方法  
        let data = {}
        mongodb.connect(DB_CONN_STR, function(err, db) {
            db.collection('blogs').ensureIndex({pid:1})
            db.collection('blogs').find({
                pid: req.body.pid
            }).toArray(function(err, result) {
                if (err) {
                    data.code = -1
                    data.err = err
                } else {
                    console.log(result)
                    if (result[0] != undefined) {
                        var blog = result[0]
                    } else {
                        var blog = {}
                    }
                    blog.date = req.body.date
                    blog.title = req.body.title
                    blog.pid = req.body.pid
                    blog.comment = req.body.comment
                    blog.content = req.body.content
                    db.collection('blogs').save(blog, function(err, result) {
                        if (err) {
                            data.code = -1
                            data.err = err
                        } else {
                            data.code = 0
                        }
                    });
                }
                res.json(data)
            })
            db.close();
        })
    },

    getBlog: function(req, res, next) { //获取单个Blog数据
        let data = {}
        mongodb.connect(DB_CONN_STR, function(err, db) {
            db.collection('blogs').ensureIndex({pid:1})
            db.collection('blogs').find({
                pid: parseInt(req.param('pid'))
            }).toArray(function(err, result) {
                if (err) {
                    data.err = err
                    data.code = -1
                } else {
                    data.code = 0
                    if (result[0] != undefined) {
                        data.data = result[0]
                        console.log(result[0])
                    } else {
                        data.msg = "找不到该数据"
                        data.code = 1000
                    }
                }
                res.json(data)
            })
            db.close()
        })
    },

    delBlog: function(req, res, next) { //删除 
        let data = {}
        mongodb.connect(DB_CONN_STR, function(err, db) {
            db.collection('blogs').ensureIndex({pid:1})
            db.collection('blogs').remove({
                pid: parseInt(req.param('pid'))
            }, function(err, result) {
                if (err) {
                    data.error = err
                    data.code = -1
                } else {
                    data.code = 0
                }
                res.json(data)
            })
            db.close()
        })
    },

    getBlogList: function(req, res) { //返还Blog数组
        let data = {};
        mongodb.connect(DB_CONN_STR, function(err, db) {
            db.collection('blogs').ensureIndex({pid:1})
            db.collection('blogs').find().sort({ pid: -1 }).toArray(function(err, result) {
                if (err) {
                    data.err = err
                    data.code = -1
                } else {
                    let brr = []
                    let page = req.param('page')
                    for (let i = 0; i < 3; i++) {
                        if (result[page * 3 + i] == undefined) {
                            continue
                        } else {
                            brr.push(result[page * 3 + i])
                        }
                    }
                    data.data = brr;
                    if (brr.length < 1) {
                        data.msg = "暂时没有数据"
                    }
                    data.page = page;
                    data.maxpage = Math.floor(result.length / 3)
                    result == "" ? data.lastpid = 0 : data.lastpid = result[0].pid
                    if (result.length % 3 == 0) {
                        data.maxpage = data.maxpage - 1
                    }
                    data.code = 0;
                }
                res.json(data)
            })
            db.close()
        })
    }
}
