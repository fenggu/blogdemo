import React, { Component } from 'react'; 
import { BlogList, Burster } from '../components'; 
import { getlistAction } from '../Redux/actions.js'   
class Home extends Component {
  constructor(props) {
    super(props); 
  }

  render() {  
    return (
      <div> 
        <BlogList /> 
        <Burster />
      </div>
    );
  }
}
 
export default Home;
