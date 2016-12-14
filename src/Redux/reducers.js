import { combineReducers } from 'redux'  
import {changecontent,getlist,getinnerblog,changetitle,addblog,createblog,changecomment,getblog,pushcomment,delblog,addpage,subpage,topage} from  './actions.js'
// Reducer 
var  initState={ 
  TopBarBtn:{
    data:[
    {to:"AddNewBlog",content:"新建",className:"new"},
    {to:{pathname: "AddNewBlog", query: {pid: null}},content:"编辑",className:"new"},
    ]
  },
  BlogList:{
    lastpid:0,
    page:0,
    maxpage:0,
    data:[
      {
        title:"",
        content:"",
        date:"",
        to:{ pathname: "Blog", query: {pid: null} },
        comment:[
        {content:"",date:""}
        ],
        pid:0
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
        ],
        pid:""
    },
  innerBlog: {
        title:"",
        content:"",
        date:"",
        to:{ pathname: "Blog", query: {pid: null} },
        comment:[
        {content:"",date:""}
        ],
        pid:""
    }
}    
//initState.BlogList.page=0
 //初始化页码数据 
function EditBlog(Blog){
  fetch('Blogs/blog', {  
          method: 'post',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
                pid:Blog.pid,
                title:Blog.title,
                content:Blog.content,
                date:Blog.date, 
                comment:Blog.comment
          })
          }).then(function(response) {  

            console.log(response.json().PromiseValue,"11")  
          }).catch(function(err) {
              // 捕获错误
              console.log(err)
          });
}

function Reducer(state, action) { 
  if(state==""||state==undefined||state==null){
    state=initState
  } 
  switch (action.type) { 
      case getinnerblog: //渲染详情页
        var nextstate=Object.assign({},state)  
        nextstate.innerBlog=action.blog[0]
        console.log(nextstate.innerBlog)
      return nextstate

      case getlist: //获取列表 
        var nextstate=Object.assign({},state)
        var _BlogList=Object.assign({},state.BlogList)
        _BlogList.data=action.list
        nextstate.BlogList=action.list 
      return nextstate

      case topage: //去指定页面
        var nextstate=Object.assign({},state)
        var _BlogList=Object.assign({},state.BlogList)
        _BlogList.page=action.page;
        nextstate.BlogList=_BlogList  
      return nextstate

      case createblog: //清空编辑区
        var nextstate=Object.assign({},state)

        var  blog= {
            title:"",
            content:"",
            date:"",
            to:{ pathname: "Blog", query: {pid: null} },
            comment:[
            {content:"",date:""}
            ],
            pid:""
        }
        nextstate.Blog=blog
      return nextstate
      case addpage: //下一页
        var nextstate=Object.assign({},state)
        var _BlogList=Object.assign({},state.BlogList)
        _BlogList.page=parseInt(_BlogList.page) 
        if(_BlogList.page==_BlogList.maxpage){
          return state
        }
        _BlogList.page=+1; 
        nextstate.BlogList=_BlogList  
      return nextstate

      case subpage: //上一页
        var _BlogList=Object.assign({},state.BlogList)
        if(_BlogList.page==0){
          return state
        } 
        _BlogList.page=_BlogList.page-1;
        nextstate.BlogList=_BlogList  
      return nextstate

      case getblog :  //检出要编辑的blog到编辑区
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
        _Blog.content=action.content;
        nextstate.Blog=_Blog 
      return nextstate

      case addblog: //增加或者编辑新的Blog到BlogList
        var nextstate=Object.assign({},state) 
        var _Blog=Object.assign({},state.Blog)
        var _BlogList=Object.assign({},state.BlogList) 
        var _date=new Date;
        _Blog.date=_date.toLocaleDateString();
        if(_Blog.pid=="") {
         _Blog.pid=parseInt(_BlogList.lastpid) + 1;
        }   
        
        EditBlog(_Blog)

      return nextstate 

      case pushcomment:  //增加新的评论
        var nextstate=Object.assign({},state)  
        var _Blog=Object.assign({},state.innerBlog)

         var _date=(new Date).toLocaleDateString(); 
         var comm={}
         comm.date=_date; 
         comm.content=action.text
        _Blog.comment.push(comm)
        nextstate.innerBlog=_Blog 
        EditBlog(_Blog)
      return nextstate
     
      case delblog:  //删除
        var nextstate=Object.assign({},state)   
          console.log(action.index)
          fetch('Blogs/delblog?pid='+action.index, {  
                  method: 'delete',
                  headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  }, 
                  }).then(function(response) {  
                    console.log(response.json())  
                  }).catch(function(err) {
                      // 捕获错误
                      console.log(err)
                  }); 
      return nextstate
     default:
     return state
   }
 }
 export default Reducer