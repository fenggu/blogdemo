import React, { Component } from 'react';
import {  connect } from 'react-redux';
import { BlogList,TopBar,Burster } from '../../components';   
import './index.css';

class RootHome extends Component {
  constructor(props) {
    super(props);
  }

  render() { 
    const {}=this.props
    return (
      <div>
        <TopBar />
        <BlogList /> 
        <Burster />
        
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

let Home = connect(
  mapStateToProps,
  mapDispatchToProps
)(RootHome) 
export default Home;
