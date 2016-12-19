var models = require('../models/doc.server.model');
var mongoose = require('mongoose');
var Blog = models.Blog

module.exports = {
    editBlog: function(req, res, next) { //增加以及编辑的方法 
        let data = {}
        Blog.find({
            "pid": req.body.pid
        }, function(err, result) {
            if (err) {
                data.code = -1
                data.err = err
            } else {
                if (result[0] != undefined) {
                    var blog = result[0]
                } else {
                    var blog = new Blog()
                }
                blog.date = req.body.date
                blog.title = req.body.title
                blog.pid = req.body.pid
                blog.comment = req.body.comment
                blog.content = req.body.content
                blog.save(function(err, res) {
                    if (err) {
                        data.code = -1
                        data.err = err
                    } else {
                        data.code = 0
                    }
                });
            }
        })
        res.json(data)
    },

    getBlog: function(req, res, next) { //获取单个Blog数据
        let data = {}
        Blog.find({
            "pid": req.param('pid')
        }, function(err, result) {
            if (err) {
                data.err = err
                data.code = -1
            } else {
                data.code = 0
                if (result[0] != undefined) {
                    data.data = result
                } else {
                    data.msg = "找不到该数据"
                    data.code = 1000
                }
                console.log(data.data)
            }

            res.json(data)
        })
    },

    delBlog: function(req, res, next) { //删除 
        let data = {}
        Blog.remove({
            "pid": req.param('pid')
        }, function(err, result) {
            if (err) {
                data.error = err
                data.code = -1
            } else {
                data.code = 0
                console.log(result)
            }
            res.json(data)
        })
    },

    getBlogList: function(req, res) { //返还Blog数组
        let data = {};
        Blog.find({}, null, { sort: { pid: -1 } }, function(err, result) {
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
    }
}
