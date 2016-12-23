import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { pushCommentAction, changeCommentAction } from '../Redux/actions.js'
import { bindActionCreators } from 'redux'
import _ from 'lodash'
class RootComment extends Component {

    constructor(props) {
        super(props);
        var defaultState = {
            comment: {
                content: ""
            }
        }
        this.state = defaultState
    }

<<<<<<< HEAD
    onTextChange = (e) => { 
        console.log(this)
=======
    onTextChange = (e) => {  
>>>>>>> master
        var comment = this.state.comment
        comment.content = e.target.value
        this.setState({ comment })
    }

    render() {
        var pid = this.props.pid
        const { innerblog, PushComment } = this.props
        const handlePushComment = (value, pid) => {
            var _blog = _.cloneDeep(innerblog)
            var _date = (new Date).toLocaleDateString();
            var comm = {}
            comm.date = _date
            comm.content = value
            _blog.comment.push(comm)
            PushComment(_blog)
            this.setState({
                comment: {
                    content: ""
                }
            })
        }

        return (
            <div className="comment" data-index={pid}>  
<<<<<<< HEAD
                {innerblog.comment!=undefined? innerblog.comment.map((Comm,index)=>
=======
                {innerblog!=undefined? innerblog.comment.map((Comm,index)=>
>>>>>>> master
                  <div key={index} className="comm">
                    <p>{Comm.content}</p>
                    <small>{Comm.date}</small>
                  </div>
                ):""}
                <div className="comm-input">
                  <input 
                    type="text" 
                    placeholder="再次输入评论" 
                    onChange={this.onTextChange} 
                    value={this.state.comment.content}
                  />
                  <span 
                    className="btn btn-default" 
                    onClick={ handlePushComment.bind(this, this.state.comment.content , pid) }
                  >立即评论</span>
                </div>
            </div>
        )
    }
}
<<<<<<< HEAD
=======
 
>>>>>>> master

function mapStateToProps(state) {
    // 这里拿到的state就是store里面给的state
    return {
        innerblog: state.innerblog
    }
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
    return {
        PushComment: bindActionCreators(pushCommentAction, dispatch)
    }
}

<<<<<<< HEAD
=======

>>>>>>> master
let Comment = connect(
    mapStateToProps,
    mapDispatchToProps
)(RootComment)
<<<<<<< HEAD
=======

export { RootComment }
>>>>>>> master
export default Comment;
