import React, { Component } from 'react';
import {  connect } from 'react-redux';
import { Link } from 'react-router';
import {changenavAction} from '../../Redux/actions.js'
import './index.css';

class RootTopTitle extends Component {
  render() { 
    return (
       <header>
         {this.props.title}
       </header>
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
      HandleBack:(e) =>{
      }
  }
}

let TopTitle = connect(
  mapStateToProps,
  mapDispatchToProps
)(RootTopTitle)
export default TopTitle; 
 