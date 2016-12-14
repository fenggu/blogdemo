import React, { Component } from 'react';
import {  connect } from 'react-redux';
import { browserHistory } from 'react-router'
import { TopBar } from '../../components';  
import {changeTitleAction,changeContentAction,DelBlogAction,addblogAction,GetBlogAction,createBlogAction} from '../../Redux/actions.js' 
import _ from 'lodash'
import './index.css';

import { bindActionCreators } from 'redux'


class RootAddNewBlog extends Component {
  /* TODO: */
  constructor(props) {
    super(props);

    var defaultState = {
      Blog: {
        title: "",
        content: "",
        date: "",
        comment: [{
          content: "",
          date: ""
        }]
      }
    }
    var pid = this.props.location.query.pid  
    if (pid) {
      defaultState.Blog = _.cloneDeep(this.props.BlogList.data[pid])
    }
    this.state = defaultState
  }  


  routerWillLeave( nextLocation ){
    return `页面即将从Home切换到${nextLocation.pathname}`
  }

  onTextChange(blogKey) {
    return e => {
      var Blog = this.state.Blog
      Blog[blogKey] = e.target.value
      this.setState({Blog})
    }
  }

  // componentWillMount() {
  //   const  {BlogList,Blog,HandleGetBlog}=this.props
  //   var pid=this.props.location.query.pid  
  //   pid!=undefined?HandleGetBlog(BlogList.data[pid]):""
  //   console.log(this.context)  
  // } 
  HandleAddBlog() {
    var Blog = this.state.Blog
    // /* TODO: */
    // var pid = this.props.location.query.pid  
    // this.props.actions.HandleAddBlog(pid, Blog)
    // window.location.href="/"
    browserHistory.push('/')
  }

  render() {   
    const  {BlogList,handleDelBlog,HandleGetBlog,HandleChangeTitle,HandleChangeContent}=this.props
    var { Blog } = this.state
    var pid=this.props.location.query.pid 
    return (
      <div>  
        <TopBar />
        <form className="BlogPage" data-index={pid}>
          <span onClick={this.HandleAddBlog.bind(this)}  className="btn btn-default">保存</span>
          <span onClick={handleDelBlog}  className="btn btn-default">删除</span>
          <div className="form-group"> 
            <label htmlFor="blogtitle">标题</label> <input type="text" id="blogtitle" className="BlogInput form-control" value={Blog.title}  onChange={this.onTextChange('title').bind(this)}/>
          </div> 
          <div className="form-group">
            <label htmlFor="blogtitle">内容</label>
            <textarea name="" id="blogcontent" className="BlogInput form-control" value={Blog.content} onChange={this.onTextChange('content').bind(this)}></textarea>
          </div>
        </form>
      </div>
    );
  }
}
 
function mapStateToProps(state) {
  // 这里拿到的state就是store里面给的state
  return {     
    BlogList:state.BlogList,
    Blog:state.Blog
  }
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
  return { 
    HandleAddBlog: bindActionCreators(addblogAction, dispatch),
    // HandleChangeTitle:(e) =>{    
    //     var target=e.target;
    //     var inner=target.value;  
    //     dispatch(changeTitleAction(inner))
    //   },
    // HandleChangeContent:(e) =>{    
    //     var target=e.target;
    //     var inner=target.value;   
    //     dispatch(changeContentAction(inner))
    //   },
    // HandleAddBlog:(e) =>{
    //   var target=e.target;
    //   var index=target.parentNode.getAttribute("data-index")
    //   dispatch(addblogAction(index))
    //   alert("保存成功")
    //   window.location.href="/"
    // },
    // HandleGetBlog:(blog)=>{ 
    //   dispatch(GetBlogAction(blog))
    // },
    handleDelBlog:(e)=>{  
      var target=e.target;
      var index=target.parentNode.getAttribute("data-index")
      if(index==null) {alert('您尚未保存')
       return false}else{
        dispatch(DelBlogAction(index))
        alert("删除成功")
        window.location.href="/"
      }
    }
  }
}

let AddNewBlog = connect(
  mapStateToProps,
  mapDispatchToProps
)(RootAddNewBlog) 
export default AddNewBlog;
