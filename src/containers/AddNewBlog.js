import React, { Component } from 'react';
import {  connect } from 'react-redux'; 
import { delBlogAction, addblogAction } from '../Redux/actions.js' 
import { browserHistory } from 'react-router'
import { bindActionCreators } from 'redux'
import _ from 'lodash' 

class RootAddNewBlog extends Component {
  constructor(props) {
    super(props);
    var defaultState = {
      blog: {
        title: "",
        content: "",
        date: "",
        comment: [{
          content: "",
          date: ""
        }],
        pid:""
      }
    }
    var pid = this.props.params.pid
    if(pid){ 
      defaultState.blog=_.cloneDeep(this.props.innerblog)
    }
    this.state = defaultState
  }  

  editblog(blog){
    fetch('/blogs/blog', {  
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
      browserHistory.push('/') 
    }).catch(function(err) { 
      console.log(err)
    });
  }

  onTextChange(blogKey){   
    return e => {
      var blog = this.state.blog
      blog[blogKey] = e.target.value
      this.setState({blog})
    }
  }
  handleAddBlog(lastpid){ 
    var  blog = this.state.blog
    var _date = new Date;
    blog.date = _date.toLocaleDateString();
    if(blog.pid == "") {
      blog.pid = parseInt(lastpid) + 1;
    }    
    this.editblog(blog) 
  }

  handleDelBlog(pid){  
    if(pid == null) {
      alert('您尚未保存')
      return false 
    }
    fetch('/blogs/blog/' + pid, {  
      method: 'delete',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }, 
    }).then(function(response) {  
      console.log(response.json()) 
      alert("删除成功")  
      browserHistory.push('/')  
    }).catch(function(err) { 
      console.log(err)
    }); 
  }

  render() {  
    const { lastpid } = this.props
    var { blog } = this.state   
    return (
      <div>   
        <form className="BlogPage">
          <span 
            onClick={this.handleAddBlog.bind(this, lastpid)}  
            className="btn btn-default"
          >保存
          </span>

          <span 
            onClick={this.handleDelBlog.bind(this, blog.pid)}  
            className="btn btn-default"
          >删除
          </span>

          <div className="form-group"> 
            <label htmlFor="blogtitle">标题</label> 
            <input 
              type="text" 
              id="blogtitle" 
              className="BlogInput 
              form-control" 
              value={blog.title}  
              onChange={this.onTextChange('title').bind(this)}
            />
          </div> 
          <div className="form-group">
            <label htmlFor="blogtitle">内容</label>
            <textarea 
              name="" 
              id="blogcontent" 
              className="BlogInput form-control" 
              value={blog.content} 
              onChange={this.onTextChange('content').bind(this)}
            >
            </textarea>
          </div>
        </form>
      </div>
    );
  }
}
 
function mapStateToProps(state) {
  // 这里拿到的state就是store里面给的state
  return {     
    innerblog:state.innerblog,
    lastpid:state.bloglist.lastpid
  }
} 

function mapDispatchToProps(dispatch) {
  return {   
  }
}

let AddNewBlog = connect(
  mapStateToProps,
  mapDispatchToProps
)(RootAddNewBlog) 
export default AddNewBlog;
