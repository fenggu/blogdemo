import React, { Component } from 'react';
import {  connect } from 'react-redux';
import { Link } from 'react-router'; 
import {markdown} from 'markdown'
import './index.css';

class RootBlogList extends Component { 
  toLittle(content){ //缩短字体
      var newcontent="" 
      content.length>200?newcontent=content.slice(0,200)+"...":newcontent=content;   
      newcontent=markdown.toHTML(newcontent) 
      var reg=/<a[^>]+?href=["']?([^"']+)["']?[^>]*>([^<]+)<\/a>/g
       newcontent= newcontent.replace(reg,"")   
      return newcontent
    } 
  render() {
    const{BlogList,HandleChangeNav}=this.props
    var brr=[] 
    var page=parseInt(BlogList.page) 
    for(let i=0;i<3;i++){ 
      if(BlogList.data[BlogList.page*3+i]==undefined){
        continue
      }else{ 
        brr.push(BlogList.data[BlogList.page*3+i])
      }
    }   
    return (
      <div className="BlogList" data-topbar={BlogList.type}>  
        {brr.map((Blog,index)=>{
          Blog.to.query.pid=index+BlogList.page*3 
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
  }
}

let BlogList = connect(
  mapStateToProps,
  mapDispatchToProps
)(RootBlogList)
export default BlogList; 
 