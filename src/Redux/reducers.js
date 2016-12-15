import { combineReducers } from 'redux'  
import * as actions from './actions'
import { browserHistory } from 'react-router'
// Reducer 
var  initState = {  
    bloglist: { 
      page: 0,
      maxpage: 0,
      data: [   
      ]
    },
    blog: {
      title:"",
      content:"",
      date:"",
      to:{ pathname: "blog", query: {pid: null} },
      comment:[
      {content:"",date:""}
      ],
      pid:""
    },
    innerblog: {
      title:"",
      content:"",
      date:"",
      to:{ pathname: "blog", query: {pid: null} },
      comment:[
      {content:"",date:""}
      ],
      pid:""
    }
  }    
//initState.bloglist.page=0
 //初始化页码数据 
 function editblog(blog){
  fetch('blogs/blog', {  
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
    console.log(response.json())  
  }).catch(function(err) { 
    console.log(err)
  });
}

function Reducer(state, action) { 
  if(!state){
    state=initState
  } 
  switch (action.type) {  
      case actions.getinnerblog: //渲染详情页
      var nextstate = Object.assign({},state)  
      nextstate.innerblog = action.blog[0] 
      return nextstate

      case actions.getlist: //获取列表 
      var nextstate = Object.assign({}, state, { bloglist: action.list}) 
      return nextstate

      case actions.topage: //去指定页面
      var nextstate = Object.assign({},state)
      var _bloglist = Object.assign({},state.bloglist)
      _bloglist.page = action.page;
      nextstate.bloglist = _bloglist   

      return nextstate

      case actions.addpage: //下一页
      var nextstate = Object.assign({}, state)
      var _bloglist = Object.assign({}, state.bloglist)
      if(_bloglist.page == _bloglist.maxpage){
        return state
      }
      _bloglist.page = _bloglist.page + 1; 
      nextstate.bloglist = _bloglist  
      return nextstate

      case actions.subpage: //上一页
      var nextstate = Object.assign({}, state)
      var _bloglist = Object.assign({}, state.bloglist)
      if(_bloglist.page == 0){
        return state
      }  
      _bloglist.page = _bloglist.page - 1;
      nextstate.bloglist = _bloglist  
      return nextstate

      case actions.getblog :  //检出要编辑的blog到编辑区
      var nextstate = Object.assign({}, state, { blog: action.blog})  
      return nextstate

      case actions.changetitle :  //修改标题  到缓存区
      var nextstate = Object.assign({}, state)
      var _blog = Object.assign({}, state.blog)
      _blog.title = action.title;
      nextstate.blog = _blog  
      return nextstate

      case actions.changecontent :  //修改内容 到缓存区
      var nextstate = Object.assign({}, state)
      var _blog = Object.assign({}, state.blog) 
      _blog.content = action.content;
      nextstate.blog = _blog 
      return nextstate


      case actions.pushcomment:  //增加新的评论
      var nextstate = Object.assign({},state)  
      var _blog = Object.assign({},state.innerblog) 
      var _date = (new Date).toLocaleDateString(); 
      var comm = {}
      comm.date = _date; 
      comm.content = action.text
      _blog.comment.push(comm)
      nextstate.innerblog = _blog 
      editblog(_blog)
      return nextstate

      default:
      return state
    }
  }
  export default Reducer