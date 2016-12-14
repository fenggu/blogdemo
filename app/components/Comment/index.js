import React, { Component } from 'react';
import {  connect } from 'react-redux';
import { Link } from 'react-router'; 
import { bindActionCreators } from 'redux'
import {PushCommentAction,changeCommentAction} from '../../Redux/actions.js'
import './index.css';

class RootComment extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      commentText: ''
    }
  }

  submitComment() {
    console.log(this.state.commentText, parseInt(this.props.pid))
    this.props.handlePushComment(this.state.commentText, parseInt(this.props.pid))
  }

  onCommentChange(e) {
    this.setState({commentText: e.target.value})
  }

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
            <input type="text" placeholder="再次输入评论" value={this.state.commentText} onChange={this.onCommentChange.bind(this)}/>
            <span className="btn btn-default" onClick={this.submitComment.bind(this)}>立即评论</span>
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
  /* TODO: 一般不会这样取值 */
  // return {  
  //     handlePushComment:(e,index)=>{
  //       var target=e.target; 
  //       var index = target.parentNode.parentNode.getAttribute("data-index")
  //       var value = target.parentNode.getElementsByTagName("input")[0].value
  //       console.log(index)
  //       index=parseInt(index)
  //       dispatch(PushCommentAction(value,index))
  //     }
  // }
  return {
    handlePushComment: bindActionCreators(PushCommentAction, dispatch)
  }
}

let Comment = connect(
  mapStateToProps,
  mapDispatchToProps
)(RootComment)
export default Comment; 
 