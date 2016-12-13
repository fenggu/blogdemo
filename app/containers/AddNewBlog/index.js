import React, { Component } from 'react';
import {  connect } from 'react-redux';
import { TopBar } from '../../components';  
import {changeTitleAction,changeContentAction,DelBlogAction,addblogAction,GetBlogAction,createBlogAction} from '../../Redux/actions.js' 
import './index.css';

class RootAddNewBlog extends Component {
  constructor(props) {
    super(props);
  }  
  routerWillLeave( nextLocation ){
    return `页面即将从Home切换到${nextLocation.pathname}`
  }
  componentWillMount() {
    const  {BlogList,Blog,HandleGetBlog}=this.props
    var pid=this.props.location.query.pid  
    pid!=undefined?HandleGetBlog(BlogList.data[pid]):""
    console.log(this.context)
    
  } 
  render() {   
    const  {Blog,BlogList,handleDelBlog,HandleGetBlog,HandleChangeTitle,HandleChangeContent,HandleAddBlog}=this.props

    var  pid=this.props.location.query.pid 
    return (
      <div>  
        <TopBar />
        <form className="BlogPage" data-index={pid}>
          <span onClick={HandleAddBlog}  className="btn btn-default">保存</span>
          <span onClick={handleDelBlog}  className="btn btn-default">删除</span>
          <div className="form-group"> 
            <label htmlFor="blogtitle">标题</label> <input type="text" id="blogtitle" className="BlogInput form-control" value={Blog.title}  onChange={HandleChangeTitle}/>
          </div> 
          <div className="form-group">
            <label htmlFor="blogtitle">内容</label>
            <textarea name="" id="blogcontent" className="BlogInput form-control" value={Blog.content} onChange={HandleChangeContent}></textarea>
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
    HandleChangeTitle:(e) =>{    
        var target=e.target;
        var inner=target.value;  
        dispatch(changeTitleAction(inner))
      },
    HandleChangeContent:(e) =>{    
        var target=e.target;
        var inner=target.value;   
        dispatch(changeContentAction(inner))
      },
    HandleAddBlog:(e) =>{
      var target=e.target;
      var index=target.parentNode.getAttribute("data-index")
      dispatch(addblogAction(index))
      alert("保存成功")
      window.location.href="/"
    },
    HandleGetBlog:(blog)=>{ 
      dispatch(GetBlogAction(blog))
    },
    handleDelBlog:(e)=>{  
      var target=e.target;
      var index=target.parentNode.getAttribute("data-index")
      if(index==null) {alert('您尚未保存')
       return false}else{
        dispatch(DelBlogAction(index))
      }
    }
  }
}

let AddNewBlog = connect(
  mapStateToProps,
  mapDispatchToProps
)(RootAddNewBlog) 
export default AddNewBlog;
