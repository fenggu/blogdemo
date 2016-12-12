import React, { Component } from 'react';
import {  connect } from 'react-redux';
import { MyComponent } from '../../components'; 
import { TopBar,BtnBox,MusicList,SelectInput } from '../../components';

import './index.css';

class RootMine extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {ValueTopBar}=this.props
    return (
      <div>
        <TopBar  ValueTopBar={ValueTopBar}/>
        <SelectInput />
        <BtnBox />
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

let Mine = connect(
  mapStateToProps,
  mapDispatchToProps
)(RootMine)  
export default Mine;
