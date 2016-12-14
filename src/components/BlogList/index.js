import React, { Component } from 'react';
import {  connect } from 'react-redux';
import { Link } from 'react-router'; 
import {markdown} from 'markdown'
import {getlistAction,getinnerblogAction} from '../../Redux/actions.js'
import './index.css';

class RootBlogList extends Component { 
  toLittle(content){ //缩短字体
      var newcontent="" 
      if(content==undefined) return
      content.length>200?newcontent=content.slice(0,200)+"...":newcontent=content;   
      newcontent=markdown.toHTML(newcontent) 
      var reg=/<a[^>]+?href=["']?([^"']+)["']?[^>]*>([^<]+)<\/a>/g
      newcontent= newcontent.replace(reg,"")   
      return newcontent
    } 

  componentDidMount() { 
        const{BlogList,PatchList,getBlog}=this.props 
        fetch('Blogs?page='+BlogList.page, {  
            method: 'get',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
           }).then(function(response) { 
            return response.json();
          }).then(function(json){    
           PatchList(json)
           getBlog()
          }).catch(function(err) {
              // 捕获错误
              console.log(err)
          }); 
  }
  render() {
    const{BlogList,HandleChangeNav}=this.props 
    return (
      <div className="BlogList" data-topbar={BlogList.type}>  
        {BlogList.data.map((Blog,index)=>{ 
          Blog.to={ pathname: "Blog", query: {pid: null} },
          Blog.to.query.pid=Blog.pid
          var  newcontent= this.toLittle(Blog.content) 
          return(
                <Link data-index={index} to={Blog.to}  key={index}>
                  <div> 
                    <header><h4>{Blog.title}</h4> 

                    <small>{Blog.date}</small></header>
                    <div dangerouslySetInnerHTML={{__html:newcontent}}></div>
                  </div>
                </Link>
            ) 
          }  
        	)} 
      </div>
    );
  }
}

function mapStateToProps(state) {
  // 这里拿到的state就是store里面给的state
  return {  
    BlogList:state.BlogList
  }
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
  return {  
    PatchList:(json)=>{
    dispatch(getlistAction(json))
    },
    getBlog:()=>{  
        var innerBlog=[{
                    title:"",
                    content:"",
                    date:"",
                    to:{ pathname: "Blog", query: {pid: null} },
                    comment:[
                    {content:"",date:""}
                    ],
                    pid:""
                }]
      dispatch(getinnerblogAction(innerBlog))
    }
  }
}

let BlogList = connect(
  mapStateToProps,
  mapDispatchToProps
)(RootBlogList)
export default BlogList; 
 