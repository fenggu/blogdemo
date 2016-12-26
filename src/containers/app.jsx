import React, { Component } from 'react';
import { Router, Route, browserHistory, hashHistory, Link ,IndexRoute} from 'react-router';
import { Home, InnerBlog, AddNewBlog, DeskTop } from './index.js' 
import { Provider, connect } from 'react-redux'; 
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import { createStore, applyMiddleware } from 'redux';
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
      ],
      pid:""
    },
    innerblog: {
      title:"",
      content:"",
      date:"",
      to:"",
      comment:[ 
      ],
      pid:""
    }
  }    

const logger = createLogger()

const createStoreWithMiddleware = applyMiddleware(
  thunk, 
  logger
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
                <Route path="/blog/:pid" component={ InnerBlog }/>
                <Route path="/addnewblog" component={ AddNewBlog }/>
                <Route path="/addnewblog/:pid" component={ AddNewBlog }/>
              </Route>
            </Router>  
          </div>
        </Provider> 
    );
  }
}
export default App