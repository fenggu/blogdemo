import { browserHistory } from 'react-router'
/*
 * action 类型
 */  
export const addblog = 'addblog';   
export const pushcomment = 'pushcomment'; //输入评论
export const getblog = 'getblog'; //获取当前需要编辑的blog到缓存区
export const delblog = 'delblog';//删除当前编辑的博客 
export const topage = 'topage';//指定分页
export const createblog = 'createblog' ;//清空缓存区
export const getlist = 'getlist' ; //获取刷新列表
export const getinnerblog = 'getinnerblog' ; //从后台获取所需要展示的blog
/*
 * action 创建函数
 */  
export function getinnerblogAction(blog){
	return {type:getinnerblog,blog:blog}
}

function getList (list){   
	return { type: getlist, list: list }
}

export function getlistAction (page) {  //请求列表数据
	return dispatch => {
		return  fetch('/blogs/v1/' + page, {  
			      method: 'get',
			      headers: {
			        'Accept': 'application/json',
			        'Content-Type': 'application/json'
			      }
			    }).then(function(response) { 
			      return response.json();
			    }).then(function(json){  
			      dispatch(getList(json))  
			    }).catch(function(err) {
			      console.log(err)
			    });
	}
}
export function topageAction(page){
	return {type:topage, page: page}
} 

export function addblogAction (blog) {  //编辑添加blog
	return dispatch => {
		return  fetch('/blogs/v1/blog', {  
			      method: 'post',
			      headers: {
			        'Accept': 'application/json',
			        'Content-Type': 'application/json'
			      },
			      body: JSON.stringify({
			        pid:blog.pid,
			        title:blog.title,
			        content:blog.content,
			        date:blog.date, 
			        comment:blog.comment
			      })
			    }).then(function(response) { 
			    	browserHistory.push("/") 
			    }).catch(function(err) { 
			      console.log(err)
			    });
	}
}

export function delBlogAction(pid){
	return dispatch => {
		return  fetch('/blogs/v1/blog/' + pid, {  
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

export function pushComment(blog){
	return { type: pushcomment,blog: blog}
}

export function pushCommentAction(blog){ 
	return dispatch => {
		return  fetch('/blogs/v1/blog', {  
			      method: 'post',
			      headers: {
			        'Accept': 'application/json',
			        'Content-Type': 'application/json'
			      },
			      body: JSON.stringify({
			        pid:blog.pid,
			        title:blog.title,
			        content:blog.content,
			        date:blog.date, 
			        comment:blog.comment
			      })
			    }).then(function(response) {  
			    	dispatch(pushComment(blog)) 
			    }).catch(function(err) { 
			      console.log(err)
			    });
	}
}

export function getBlogAction(blog){
	return { type: getblog, blog: blog}
}
