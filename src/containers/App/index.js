
import React, { Component } from 'react';
import { Router, Route, browserHistory , Link } from 'react-router';
import  RootApp  from '../../containers/Home';  
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import reducer from '../../Redux/reducers.js';
let store = createStore(reducer);
class App extends Component {
  render() {
    return (	
  		<Provider store={store}> 
  			<RootApp /> 
  		</Provider>
    );
  }
}

export default App;