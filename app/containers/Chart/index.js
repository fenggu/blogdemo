import React, { Component } from 'react';
import {  connect } from 'react-redux';
import { MyComponent } from '../../components'; 
import { TopBar,Aplayer} from '../../components';

import './index.css';

class RootChart extends Component {
  constructor(props) {
    super(props);
  }

  render() { 
    const {ValueTopBar}=this.props
    return (
      <div>
        <TopBar ValueTopBar={ValueTopBar} />
        <p> 
        </p>
        
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

let Chart = connect(
  mapStateToProps,
  mapDispatchToProps
)(RootChart) 
export default Chart;
