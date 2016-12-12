import React, { Component } from 'react';
import { Router, Route, browserHistory, Link ,IndexRoute} from 'react-router';
import {Home,Mine,Chart,Recommend,Sheet,MyLike} from '../index.js'
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux'; 
import reducer from '../../Redux/reducers.js';
import {Aplayer} from '../../components'
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
        <Router history={browserHistory}>
          <Route path="/"> 
            <IndexRoute component={Home}/>
            <Route path="/Recommend" component={Recommend} />
            <Route path="/Sheet" component={Sheet} />
            <Route path="Mine"> 
              <IndexRoute component={Mine}/> 
              <Route path="MyLike" component={MyLike} />
            </Route>
            <Route path="/Chart" component={Chart} />
          </Route>
        </Router> 
        <Aplayer />
      </div>
    </Provider>

    );
  }
}
export default App