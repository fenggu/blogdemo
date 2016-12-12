import React, { Component } from 'react';
import {  connect } from 'react-redux';
import { MyComponent } from '../../components'; 
import { TopBar,Aplayer} from '../../components';
import {changenavAction} from '../../Redux/actions.js'
import './index.css';

class RootRecommend extends Component {
  constructor(props) {
    super(props);
  }

  render() { 
    const {ValueTopBar,HomeBar}=this.props
    return (
      <div>
        <TopBar ValueTopBar={ValueTopBar} />
        <TopBar ValueTopBar={HomeBar}/>
        <p> 
        </p>
        
      </div>
    );
  }
}


function mapStateToProps(state) {
  // 这里拿到的state就是store里面给的state
  return {  
    ValueTopBar:state.TopBar,
    HomeBar:state.HomeBar
  }
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
  return { 
  }
}

let Recommend = connect(
  mapStateToProps,
  mapDispatchToProps
)(RootRecommend) 
export default Recommend;
