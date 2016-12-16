import React, { Component } from 'react';
import { Router, Route, browserHistory, hashHistory, Link ,IndexRoute} from 'react-router';
import {Home,InnerBlog,AddNewBlog,DeskTop} from './index.js' 
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import { Provider, connect } from 'react-redux'; 
import reducer from '../Redux/reducers.js'; 
import './index.css';

var  initState = {  
    bloglist: { 
      page: 0,
      maxpage: 0,
      data: [   
      ]
    },
    blog: {
      title:"",
      content:"",
      date:"",
      to:"",
      comment:[
      {content:"",date:""}
      ],
      pid:""
    },
    innerblog: {
      title:"",
      content:"",
      date:"",
      to:"",
      comment:[
      {content:"",date:""}
      ],
      pid:""
    }
  }    

const createStoreWithMiddleware = applyMiddleware(
  thunk, 
)(createStore);

let store = createStoreWithMiddleware(reducer,initState);

class App extends Component { 
  constructor(props) {
    super(props);
  }

  render() { 
    return (
    <Provider store={store}>
      <div>
        <Router history={ browserHistory }>
          <Route path="/" component={ DeskTop }> 
            <IndexRoute component={ Home }/> 
            <Route path="/Blog/:pid" component={ InnerBlog }/>
            <Route path="/AddNewBlog" component={ AddNewBlog }/>
            <Route path="/AddNewBlog/:pid" component={ AddNewBlog }/>
          </Route>
        </Router>  
      </div>
    </Provider>

    );
  }
}
export default App