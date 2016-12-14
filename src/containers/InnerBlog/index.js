import React, { Component } from 'react';
import {  connect } from 'react-redux';
import { BlogList,TopBar,Comment } from '../../components';   
import {markdown} from 'markdown'
import {getinnerblogAction} from '../../Redux/actions.js'
import './index.css';

class RootInnerBlog extends Component {
  constructor(props) {
    super(props);
  }  
  componentDidMount() { 
        const pid=this.props.location.query.pid 
        const{getBlog}=this.props 
        fetch('Blogs/blog?pid='+pid, {  
            method: 'get',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
           }).then(function(response) { 
            return response.json();
          }).then(function(json){    
           getBlog(json.data)
          }).catch(function(err) {
              // 捕获错误
              console.log(err)
          }); 
  }  

  render() { 
    const {innerBlog}=this.props 
    var content=markdown.toHTML(innerBlog.content)
    const pid=this.props.location.query.pid 
    return (
      <div>  
        <TopBar pid={pid}/>
          <div className="BlogPage">
              <header><h4>{innerBlog.title}</h4> 
              <small>{innerBlog.date}</small></header>
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
    innerBlog:state.innerBlog
  }
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
  return { 
    getBlog:(blog)=>{ 
      dispatch(getinnerblogAction(blog))
    }
  }
}

let InnerBlog = connect(
  mapStateToProps,
  mapDispatchToProps
)(RootInnerBlog) 
export default InnerBlog;
