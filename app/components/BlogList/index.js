import React, { Component } from 'react';
import {  connect } from 'react-redux';
import { Link } from 'react-router'; 
import './index.css';

class RootBlogList extends Component {
  render() {
    const{BlogList,HandleChangeNav}=this.props

    return (
      <div className="BlogList" data-topbar={BlogList.type}>  
        {BlogList.data.map((Blog,index)=>{
          Blog.to.query.pid=index
          return(
            <Link data-index={index} to={Blog.to}  key={index}>
              <div>
                <header><h4>{Blog.title}</h4> <small>{Blog.date}</small></header>
                <p>{Blog.content.length>200?Blog.content.slice(0,200)+"...":Blog.content}</p>
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
 