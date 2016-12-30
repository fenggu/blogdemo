import { browserHistory } from 'react-router'
import fetch from 'isomorphic-fetch'
/*
 * action 类型
 */
export const addblog = 'addblog';
export const adduser = 'adduser'; //注册
export const login = 'login'; //登录
export const pushcomment = 'pushcomment'; //输入评论 
export const delblog = 'delblog'; //删除当前编辑的博客 
export const topage = 'topage'; //指定分页 
export const getlist = 'getlist'; //获取刷新列表
export const getinnerblog = 'getinnerblog'; //从后台获取所需要展示的blog
/*
 * action 创建函数
 */

export function getinner(blog) {
    return { type: getinnerblog, blog: blog }
}

function getList(list) {
    return { type: getlist, list: list }
}

export function getuser(user) {
    return { type: login, user: user }
}

export function adduserAction(user) { //注册
    return dispatch => {
        return fetch('/v1/blogs/sign', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: user.username,
                password: user.password
            })
        }).then(function(response) {
            return response.json()
        }).then(function(json) {
            console.log(json)
            if (json.code == -1) {
                alert(json.msg)
            } else {
                dispatch(getuser(json.data))
                browserHistory.push("/")
            }
        }).catch(function(err) {
            console.log(err)
        });
    }
}

export function loginAction(user) { //登录
    return dispatch => {
        return fetch('/v1/blogs/login', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: user.username,
                password: user.password
            })
        }).then(function(response) {
            return response.json()
        }).then(function(json) {
            if (json.code == -1) {
                alert(json.msg)
            } else {
                dispatch(getuser(json.data))
                browserHistory.push("/")
            }
        }).catch(function(err) {
            console.log(err)
        });
    }
}

export function searchBlog(text,page) { //请求列表数据
    return dispatch => {
        return fetch('/v1/blogs/', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                text: text,
                page: page
            })
        }).then(function(response) {
            return response.json();
        }).then(function(json) {
            dispatch(getList(json))
        }).catch(function(err) {
            console.log(err)
        });
    }
}

export function getlistAction(page) { //请求列表数据
    return dispatch => {
        return fetch('/v1/blogs/' + page, {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(function(response) {
            return response.json();
        }).then(function(json) {
            dispatch(getList(json))
        }).catch(function(err) {
            console.log(err)
        });
    }
}
export function topageAction(page) {
    return { type: topage, page: page }
}

export function addblogAction(blog) { //编辑添加blog
    return dispatch => {
        return fetch('/v1/blogs/blog', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                auther: blog.auther,
                pid: blog.pid,
                title: blog.title,
                content: blog.content,
                date: blog.date,
                comment: blog.comment
            })
        }).then(function(response) {
            browserHistory.push("/")
        }).catch(function(err) {
            console.log(err)
        });
    }
}

export function delblogAction(pid) {
    return dispatch => {
        return fetch('/v1/blogs/blog/' + pid, {
            method: 'delete',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        }).then(function(response) {
            alert("删除成功")
            browserHistory.push("/")
        }).catch(function(err) {
            console.log(err)
        });
    }
}

export function pushCommentA(blog) {
    return { type: pushcomment, blog: blog }
}

export function pushCommentAction(blog) {
    return dispatch => {
        return fetch('/v1/blogs/blog', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                pid: blog.pid,
                title: blog.title,
                content: blog.content,
                date: blog.date,
                comment: blog.comment
            })
        }).then(function(response) {
            dispatch(pushCommentA(blog))
        }).catch(function(err) {
            console.log(err)
        });
    }
}


export function getinnerblogAction(pid) {
    return dispatch => {
        return fetch('/v1/blogs/blog/' + pid, {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        }).then(function(response) {
            return response.json()
        }).then(function(json) {
            console.log(json.data)
            dispatch(getinner(json.data))
        }).catch(function(err) {
            console.log(err)
        });
    }
}
