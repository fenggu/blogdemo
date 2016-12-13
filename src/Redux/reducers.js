import { combineReducers } from 'redux'  
import {changecontent,getlist,changetitle,addblog,createblog,changecomment,getblog,pushcomment,delblog,addpage,subpage,topage} from  './actions.js'
// Reducer 
var  initState={ 
  TopBarBtn:{
    data:[
    {to:"AddNewBlog",content:"新建",className:"new"},
    {to:{pathname: "AddNewBlog", query: {pid: null}},content:"编辑",className:"new"},
    ]
  },
  BlogList:{
    page:0,
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
    }
}  
if(localStorage.bloglist){ 
  JSON.parse(localStorage.bloglist).data.length>0?initState.BlogList=JSON.parse(localStorage.bloglist):""//读取数据 
  if(JSON.parse(localStorage.bloglist).data.length>0&&initState.BlogList.data[0].title==""){
    initState.BlogList.data.shift();
    localStorage.bloglist= JSON.stringify(initState.BlogList);
  }
}
  initState.BlogList.maxpage=Math.floor(initState.BlogList.data.length/3) 
if(initState.BlogList.data.length%3==0){initState.BlogList.maxpage=initState.BlogList.maxpage-1} 
initState.BlogList.page=0
 //初始化页码数据 
function Reducer(state, action) { 
  if(state==""||state==undefined||state==null){
    state=initState
  } 
  switch (action.type) { 
      case getlist:
        var nextstate=Object.assign({},state)
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
        var nextstate=Object.assign({},state)
        var _BlogList=Object.assign({},state.BlogList)
        if(_BlogList.page==0){
          return state
        }
        _BlogList.page=-1;
        nextstate.BlogList=_BlogList  
      return nextstate

      case getblog :  //从list检出要编辑的blog到编辑区
        var nextstate=Object.assign({},state)  
        nextstate.Blog=action.blog

        console.log(nextstate.Blog) 
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
        var _TopBarBtn=Object.assign({},state._TopBarBtn)
        var _Blog=Object.assign({},state.Blog)
        var _BlogList=Object.assign({},state.BlogList) 
        var _date=new Date;
        _Blog.date=_date.toLocaleDateString(); 
        _Blog.pid=_BlogList.data[_BlogList.data.length-1].pid+1
        action.index==null?_BlogList.data.push(_Blog):_BlogList.data[_Blog.to.query.pid]=_Blog
        
        _BlogList.maxpage=Math.floor(_BlogList.data.length/3)  
        
        nextstate.BlogList=_BlogList 
        localStorage.bloglist= JSON.stringify(_BlogList);  //将数据存储到localstorge中
        
        fetch('addblog', {  
          method: 'post',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
                pid:_Blog.pid,
                title:_Blog.title,
                content:_Blog.content,
                date:_Blog.date, 
                comment:_Blog.comment
          })
         }).then(function(response) { 
             
            console.log(response.json())  
        }).catch(function(err) {
            // 捕获错误
            console.log(err)
        });

      return nextstate 

      case pushcomment:  //增加新的评论
        var nextstate=Object.assign({},state) 
        var _BlogList=Object.assign({},state.BlogList)
        var _Blog=_BlogList.data[action.index]  

         var _date=(new Date).toLocaleDateString(); 
         var comm={}
         comm.date=_date;
         console.log(_date)
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