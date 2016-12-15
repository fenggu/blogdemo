import React, { Component, Children } from 'react';
import {  connect } from 'react-redux';
import { BlogList, TopBar, Burster } from '../components'; 

class RootDeskTop extends Component {
  constructor(props) {
    super(props);
  }

  render() {    
    if(this.props.params){
      var pid = this.props.params.pid
      console.log(this.props.params)
    }
    return (
      <div>
        <TopBar pid={pid}/> 
        { this.props.children }
      </div>
    );
  }
}


function mapStateToProps(state) {
  // 这里拿到的state就是store里面给的state
  return {   
  }
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
  return { 
  }
}

let DeskTop = connect(
  mapStateToProps,
  mapDispatchToProps
)(RootDeskTop) 
export default DeskTop;
