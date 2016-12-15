import React, { Component } from 'react'; 
import { Link } from 'react-router'; 

class TopBar extends Component {
  constructor(props) {
    super(props); 
  }  
  render() { 
    var { pid } = this.props 
    return (
      <header className="TopBar">  
         <Link to="/"><h1>Blog</h1></Link> 
         <Link className="new"  to="/AddNewblog" >
            <span>新建</span>
         </Link>
         <Link className={ pid ? "new" : "hide" }  to={'/AddNewblog/' + pid} >
            <span>编辑</span>
         </Link>
      </header>
    );
  }
}
 
export default TopBar; 
