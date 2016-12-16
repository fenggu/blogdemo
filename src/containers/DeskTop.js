import React, { Component, Children } from 'react'; 
import { BlogList, TopBar, Burster } from '../components'; 

class DeskTop extends Component {
  constructor(props) {
    super(props);
  }

  render() {    
    if(this.props.params){
      var pid = this.props.params.pid
      console.log(this.props.params)
    }
    return (
      <div>
        <TopBar pid={ pid }/> 
        { this.props.children }
      </div>
    );
  }
} 

export default DeskTop;
