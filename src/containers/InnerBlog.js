import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Comment } from '../components';
import { markdown } from 'markdown'
import { getinnerblogAction } from '../Redux/actions.js'
import { bindActionCreators } from 'redux'

class RootInnerBlog extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        const pid = this.props.params.pid
        const { getBlog } = this.props 
        getBlog(pid)  
    }

    render() {
        const { innerblog } = this.props 
        var content = markdown.toHTML(innerblog.content)
        const pid = this.props.params.pid
        return ( 
            <div>   
                <div className="BlogPage">
                    <header><h4>{innerblog.title}</h4> 
                    <small>{innerblog.date}</small></header>
                    <div dangerouslySetInnerHTML = {{__html:content}}></div> 
                </div>
                    <Comment pid = { pid } />
            </div>
        )
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
        getBlog: bindActionCreators(getinnerblogAction, dispatch)
    }
}

let InnerBlog = connect(
    mapStateToProps,
    mapDispatchToProps
)(RootInnerBlog)
export default InnerBlog;
