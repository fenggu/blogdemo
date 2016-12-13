import React, { Component } from 'react';
import {  connect } from 'react-redux';
import { Link } from 'react-router'; 
import {PushCommentAction,changeCommentAction} from '../../Redux/actions.js'
import './index.css';

class RootComment extends Component {
  render() { 
    const pid=this.props.pid
    const {BlogList,handlePushComment}=this.props
    const Blog=BlogList.data[pid] 
    return (
      <div className="Comment" data-index={pid}>  
          {Blog.comment!=undefined? Blog.comment.map((Comm,index)=>
            <div key={index} className="Comm">
              <p>{Comm.content}</p>
              <small>{Comm.date}</small>
            </div>
          ):""}
          <div className="CommInput">
            <input type="text" placeholder="再次输入评论"/>
            <span className="btn btn-default" onClick={handlePushComment}>立即评论</span>
          </div>
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
      handlePushComment:(e,index)=>{
        var target=e.target; 
        var index = target.parentNode.parentNode.getAttribute("data-index")
        var value = target.parentNode.getElementsByTagName("input")[0].value
        console.log(index)
        index=parseInt(index)
        dispatch(PushCommentAction(value,index))
      }
  }
}

let Comment = connect(
  mapStateToProps,
  mapDispatchToProps
)(RootComment)
export default Comment; 
 