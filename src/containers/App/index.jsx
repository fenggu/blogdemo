import React, { Component } from 'react';
import { Router, Route, hashHistory, Link ,IndexRoute} from 'react-router';
import {Home,InnerBlog,AddNewBlog} from '../index.js'
import {TopBar} from '../../components/index.js'
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux'; 
import reducer from '../../Redux/reducers.js'; 
import './index.css';
 

let store = createStore(reducer);
class App extends Component { 
  constructor(props) {
    super(props);
  }

  render() {
    return (
    <Provider store={store}>
      <div>
        <Router history={hashHistory}>
          <Route path="/"> 
            <IndexRoute component={Home}/> 
            <Route path="/Blog" component={InnerBlog}/>
            <Route path="/AddNewBlog" component={AddNewBlog}/>
          </Route>
        </Router>  
      </div>
    </Provider>

    );
  }
}
export default App