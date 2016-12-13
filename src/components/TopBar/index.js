import React, { Component } from 'react';
import {  connect } from 'react-redux';
import { Link } from 'react-router'; 
import {createBlogAction} from '../../Redux/actions.js'
import './index.css';

class RootTopBar extends Component {
  render() {
    const{TopBarBtn,handleCreateBlog}=this.props  
      const pid=this.props.pid 
      pid==undefined? TopBarBtn.data[1].className="hide":TopBarBtn.data[1].className="new";
      TopBarBtn.data[1].to.query.pid=pid
    return (
      <header className="TopBar">  
         <Link to="/"><h1>Blog</h1></Link>
         {TopBarBtn.data.map((Btn,index)=>
           <Link className={Btn.className} key={index} to={Btn.to}><span onClick={handleCreateBlog}>{Btn.content}</span></Link>
         )}
      </header>
    );
  }
}

function mapStateToProps(state) {
  // 这里拿到的state就是store里面给的state
  return { 
    TopBarBtn:state.TopBarBtn 
  }
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
  return {  
    handleCreateBlog:(e)=>{
      dispatch(createBlogAction())
    }
  }
}

let TopBar = connect(
  mapStateToProps,
  mapDispatchToProps
)(RootTopBar)
export default TopBar; 
 