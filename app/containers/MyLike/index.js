import React, { Component } from 'react';
import {  connect } from 'react-redux';
import { MyComponent } from '../../components'; 
import { TopBar,BtnBox,MusicList,SelectInput } from '../../components';

import './index.css';

class RootMyLike extends Component { 
  render() {
    
    return (
      <div> 
        <p>MyLike</p>
        <MusicList /> 
      </div>
    );
  }
}

function mapStateToProps(state) {
  // 这里拿到的state就是store里面给的state
  return {  
    ValueTopBar:state.TopBar
  }
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
  return { 
  }
}

let MyLike = connect(
  mapStateToProps,
  mapDispatchToProps
)(RootMyLike)  
export default MyLike;
