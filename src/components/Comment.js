import React, { Component } from 'react';
import {  connect } from 'react-redux';
import { Link } from 'react-router'; 
import { pushCommentAction, changeCommentAction } from '../Redux/actions.js' 
import { bindActionCreators } from 'redux'
class RootComment extends Component {

  constructor(props) {
    super(props);
    var defaultState = {
      comment: {
          content: "",
          date: ""
        }
    }
    this.state = defaultState
  }  

  onTextChange(e){    
      var comment = this.state.comment
      comment.content = e.target.value
      this.setState({comment})
  } 

  render() { 
    var pid = this.props.pid
    const {innerblog,handlePushComment}=this.props
    return (
      <div className="Comment" data-index={pid}>  
          {innerblog.comment!=undefined? innerblog.comment.map((Comm,index)=>
            <div key={index} className="Comm">
              <p>{Comm.content}</p>
              <small>{Comm.date}</small>
            </div>
          ):""}
          <div className="CommInput">
            <input type="text" placeholder="再次输入评论" onChange={ this.onTextChange.bind(this) } value={ this.state.comment.content }/>
            <span className="btn btn-default" onClick={ handlePushComment.bind(this, this.state.comment.content , pid) }>立即评论</span>
          </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  // 这里拿到的state就是store里面给的state
  return {  
    innerblog: state.innerblog
  }
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
  return {  
    handlePushComment:bindActionCreators(pushCommentAction, dispatch) 
  }
}

let Comment = connect(
  mapStateToProps,
  mapDispatchToProps
)(RootComment)
export default Comment; 
 