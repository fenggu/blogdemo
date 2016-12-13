import React, { Component } from 'react';
import {  connect } from 'react-redux';
import { BlogList,TopBar,Comment } from '../../components';   
import {markdown} from 'markdown'
import './index.css';

class RootInnerBlog extends Component {
  constructor(props) {
    super(props);
  } 
  render() { 
    const pid=this.props.location.query.pid
    const {BlogList}=this.props
    const Blog=BlogList.data[pid]
    var content=markdown.toHTML(Blog.content)
    return (
      <div>  
        <TopBar pid={pid}/>
          <div className="BlogPage">
              <header><h4>{Blog.title}</h4> 
              <small>{Blog.date}</small></header>
              <div dangerouslySetInnerHTML={{__html:content}}></div> 
          </div>
              <Comment pid={pid} />
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

let InnerBlog = connect(
  mapStateToProps,
  mapDispatchToProps
)(RootInnerBlog) 
export default InnerBlog;
