import React, { Component } from 'react';
import {  connect } from 'react-redux';
import { Link } from 'react-router';
import {changenavAction} from '../../Redux/actions.js'
import './index.css';

class RootTopBar extends Component {
  render() {
    const{ValueTopBar,HandleChangeNav}=this.props

    return (
      <nav className={ValueTopBar.class} data-topbar={ValueTopBar.type}>  
        {ValueTopBar.data.map((TopBar,index)=>
        	<Link {...TopBar}   onClick={HandleChangeNav} data-index={index} to={TopBar.to} id={TopBar.id} key={index} className={TopBar.clsName}>{TopBar.name}</Link>

        	)} 
      </nav>
    );
  }
}

function mapStateToProps(state) {
  // 这里拿到的state就是store里面给的state
  return {  
  }
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
  return { 
      HandleChangeNav:(e) =>{
      	var Ev =e.target;
        var _index=Ev.getAttribute("data-index")
        var _type=Ev.parentNode.getAttribute("data-topbar") 
        dispatch(changenavAction(_index,_type))
      }
  }
}

let TopBar = connect(
  mapStateToProps,
  mapDispatchToProps
)(RootTopBar)
export default TopBar; 
 