import React, { Component } from 'react'; 
import { BlogList, Burster } from '../components'; 
import { getlistAction } from '../Redux/actions.js'   
class Home extends Component {
  constructor(props) {
    super(props); 
  }

  getlist(page,dispatch){ 
    fetch('/blogs/v1/' + page, {  
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
 
export default Home;
