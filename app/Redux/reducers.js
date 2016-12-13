import { combineReducers } from 'redux'  
import {changecontent,changetitle,addblog,changecomment,getblog,pushcomment,delblog} from  './actions.js'

// Reducer 
var  initState={ 
  TopBarBtn:{
    data:[
    {to:"AddNewBlog",content:"新建",className:"new"},
    {to:{pathname: "AddNewBlog", query: {pid: null}},content:"编辑",className:"new"},
    ]
  },
  BlogList:{
    data:[
      {
        title:"",
        content:"",
        date:"",
        to:{ pathname: "Blog", query: {pid: null} },
        comment:[
        {content:"",date:""}
        ]
      }
    ]
  },
  Blog: {
        title:"",
        content:"",
        date:"",
        to:{ pathname: "Blog", query: {pid: null} },
        comment:[
        {content:"",date:""}
        ]
    }
}
localStorage.bloglist?initState.BlogList=JSON.parse(localStorage.bloglist):""//读取数据
function Reducer(state, action) { 
  if(state==""||state==undefined||state==null){
    state=initState
  } 
  switch (action.type) { 
      case getblog :  //修改标题  
        var nextstate=Object.assign({},state)  
        nextstate.Blog=action.blog 
      return nextstate
      case changetitle :  //修改标题  到缓存区
        var nextstate=Object.assign({},state)
        var _Blog=Object.assign({},state.Blog)
        _Blog.title=action.title;
        nextstate.Blog=_Blog  
      return nextstate

      case changecontent :  //修改内容 到缓存区
        var nextstate=Object.assign({},state)
        var _Blog=Object.assign({},state.Blog)
        console.log(action.index)
        _Blog.content=action.content;
        nextstate.Blog=_Blog 
      return nextstate

      case addblog: //增加或者编辑新的Blog到BlogList
        var nextstate=Object.assign({},state)
        var _TopBarBtn=Object.assign({},state._TopBarBtn)
        var _Blog=Object.assign({},state.Blog)
        var _BlogList=Object.assign({},state.BlogList) 
        var _date=new Date;
        _Blog.date=_date.toString();
        action.index==null?_BlogList.data.push(_Blog):_BlogList.data[_Blog.to.query.pid]=_Blog
        nextstate.BlogList=_BlogList 
        localStorage.bloglist= JSON.stringify(_BlogList);  //将数据存储到localstorge中
      return nextstate 

      case pushcomment:  //增加新的评论
        var nextstate=Object.assign({},state) 
        var _BlogList=Object.assign({},state.BlogList)
        var _Blog=_BlogList.data[action.index] 
         var _date=(new Date).toString(); 
         var comm={}
         comm.date=_date;
         comm.content=action.text
        _Blog.comment.push(comm)
        _BlogList.data[action.index]=_Blog
        nextstate.BlogList=_BlogList
        localStorage.bloglist= JSON.stringify(_BlogList);  //将数据存储到localstorge中
      return nextstate
     
      case delblog:
        var nextstate=Object.assign({},state) 
        var _BlogList=Object.assign({},state.BlogList)
        _BlogList.data.splice(action.index,1)
        nextstate.BlogList=_BlogList
        localStorage.bloglist= JSON.stringify(_BlogList);  //将数据存储到localstorge中
      return nextstate
     default:
     return state
   }
 }
 export default Reducer