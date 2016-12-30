var mongodb = require('mongodb').MongoClient;
var DB_CONN_STR = 'mongodb://localhost:27017/blogdemo'

module.exports = {

    login: (req, res, next) => { //登录
        let data = {}
        mongodb.connect(DB_CONN_STR, (err, db) => {
            db.collection('user').find({
                username: req.body.username
            },{ username:1, password:1,_id: 0 }).toArray((err, result) => {
                db.close()
                if (err) {
                    data.err = err
                    data.code = -1
                } else {
                    data.code = 0
                    console.log(result[0])
                    if (result[0] != undefined) {
                        if(result[0].password == req.body.password) {
                            data.data = {}
                            data.data.username = result[0].username
                            data.data.login = true
                            data.code = 0
                        } else {
                            data.msg = "密码错误"
                            data.code = -1
                        }
                    } else {
                        data.msg = "账号不存在"
                        data.code = -1
                    }
                }
                res.json(data)
            })
        })
    },

    addUser: (req, res, next) => { //注册  
        let data = {}
        mongodb.connect(DB_CONN_STR, (err, db) => {
            db.collection('user').find({
                username: req.body.username
            }).toArray((err, result) => {
                if (err) {
                    data.code = -1
                    data.err = err
                } else { 
                    if (result[0] != undefined) {
                        data.msg = "该用户已存在"
                        data.code = -1
                    } else {
                        var user = {}
                        user.username = req.body.username
                        user.password = req.body.password
                        db.collection('user').save(user, (err, result) => {
                            db.close()
                            if (err) {
                                data.code = -1
                                data.err = err
                            } else {
                                data.data = {}
                                data.data.username =user.username 
                                data.data.login = true
                                data.code = 0 
                                res.json(data)
                            }
                        });
                    }
                }
            })
        })
    },

    editBlog: (req, res, next) => { //增加以及编辑的方法  
        let data = {}
        mongodb.connect(DB_CONN_STR, (err, db) => {
            db.collection('blogs').find({
                pid: req.body.pid
            }).toArray((err, result) => {
                if (err) {
                    data.code = -1
                    data.err = err
                } else {
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
                    blog.auther = req.body.auther
                    db.collection('blogs').save(blog, (err, result) => {
                        db.close()
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
        })
    },

    getBlog: (req, res, next) => { //获取单个Blog数据
        let data = {}
        mongodb.connect(DB_CONN_STR, (err, db) => {
            db.collection('blogs').createIndex({ pid: 1 })
            db.collection('blogs').find({
                pid: parseInt(req.param('pid'))
            }).toArray((err, result) => {
                db.close()
                if (err) {
                    data.err = err
                    data.code = -1
                } else {
                    data.code = 0
                    if (result[0] != undefined) {
                        data.data = result[0]
                    } else {
                        data.msg = "找不到该数据"
                        data.code = 1000
                    }
                }
                res.json(data)
            })
        })
    },

    delBlog: (req, res, next) => { //删除 
        let data = {}
        mongodb.connect(DB_CONN_STR, (err, db) => {
            db.collection('blogs').createIndex({ pid: 1 })
            db.collection('blogs').remove({
                pid: parseInt(req.param('pid'))
            }, function(err, result) {
                db.close()
                if (err) {
                    data.error = err
                    data.code = -1
                } else {
                    data.code = 0
                }
                res.json(data)
            })
        })
    },

    getBlogList: (req, res) => { //返还Blog数组
        let data = {};
        mongodb.connect(DB_CONN_STR, (err, db) => {
            db.collection('blogs').find().sort({ pid: -1 }).toArray((err, result) => {
                db.close()
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
        })
    },
    searchBlog: (req, res) => { //返还Blog数组
        let data = {};
        mongodb.connect(DB_CONN_STR, (err, db) => {
            db.collection('blogs').createIndex( { title: "text", content: "text" ,auther: "text"} )
            console.log( req.body.text)
            db.collection('blogs').find({ $text: { $search: req.body.text } }).sort({ pid: -1 }).toArray((err, result) => {
                db.close()
                if (err) {
                    data.err = err
                    data.code = -1
                } else {
                    let brr = []
                    let page = req.body.page
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
                console.log(data)
                res.json(data)
            })
        })
    }
}
