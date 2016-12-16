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
      to:"",
      comment:[
      {content:"",date:""}
      ],
      pid:""
    },
    innerblog: {
      title:"",
      content:"",
      date:"",
      to:"",
      comment:[
      {content:"",date:""}
      ],
      pid:""
    }
  }     

 function editblog(blog){
  fetch('/blogs/v1/blog', {  
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

      case actions.getblog :  //检出要编辑的blog到编辑区  
      return Object.assign({}, state, { blog: action.blog })  

      case actions.getlist: //获取列表  
      return Object.assign({}, state, { bloglist: action.list })

      case actions.topage: //去指定页面 
      var _bloglist = Object.assign({}, state.bloglist)
      _bloglist.page = action.page;  
      return Object.assign({}, state, { bloglist: _bloglist })

      case actions.pushcomment:  //增加新的评论    
      var _blog = Object.assign({}, state.innerblog) 
      var _date = (new Date).toLocaleDateString(); 
      var comm = {}
      comm.date = _date; 
      comm.content = action.text
      _blog.comment.push(comm)   
      editblog(_blog)
      return Object.assign({}, state, { innerblog: _blog }) 

      default:
      return state
    }
  }
  export default Reducer