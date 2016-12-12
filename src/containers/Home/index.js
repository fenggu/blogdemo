import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {  connect } from 'react-redux';
import { increaseAction } from '../../Redux/actions.js';
import  { LeftBar } from '../../components'
import  { MainBox } from '../../components'
import './index.css';
class Home extends Component {

  
  constructor(props) {
    super(props);
  }
  render() {  
    return (
      <div>
        <LeftBar></LeftBar>
        <MainBox></MainBox>
      </div>
    );
  }

}
function mapStateToProps(state) {
  // 这里拿到的state就是store里面给的state
  return { 
    state:state
  }
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
  return { 
  }
}

// Connected Component
let RootApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)

export default RootApp;
