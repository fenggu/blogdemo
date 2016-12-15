import React, { Component } from 'react';
import {  connect } from 'react-redux';
import { BlogList, Burster } from '../components'; 
import { getlistAction } from '../Redux/actions.js' 
import { bindActionCreators } from 'redux'    
class RootHome extends Component {
  constructor(props) {
    super(props); 
  }

  getlist(page,dispatch){ 
    fetch('/blogs/' + page, {  
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(function(response) { 
      return response.json();
    }).then(function(json){  
      dispatch(json)   
    }).catch(function(err) {
      console.log(err)
    });   
  }
  render() {  
    return (
      <div> 
        <BlogList getlist={this.getlist}/> 
        <Burster getlist={this.getlist}/>
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
