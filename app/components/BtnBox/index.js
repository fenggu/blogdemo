import React, { Component } from 'react';
import {  connect } from 'react-redux';
import { Link } from 'react-router';
import {changenavAction} from '../../Redux/actions.js'
import './index.css';

class RootBtnBox extends Component {
  render() {
    const{BtnBox,HandleChangeNav}=this.props
    return (
      <div className="BtnBox"> 
        {BtnBox.map((BtnBox,index)=>
              <Link id={BtnBox.id} to={BtnBox.to} key={index}>
                <img src={BtnBox.img} alt=""/>
                <p>{BtnBox.title}</p>
              </Link>
                )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  // 这里拿到的state就是store里面给的state
  return { 
    BtnBox:state.BtnBox
  }
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
  return { 
      HandleChangeNav:(e) =>{
      	var Ev =e.target;
      	var _index=Ev.getAttribute("data-index")
        dispatch(changenavAction(_index))
      }
  }
}

let BtnBox = connect(
  mapStateToProps,
  mapDispatchToProps
)(RootBtnBox)
export default BtnBox; 
 