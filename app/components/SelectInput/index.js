import React, { Component } from 'react';
import {  connect } from 'react-redux';
import { Link } from 'react-router';
import {changeSelectAction} from '../../Redux/actions.js'
import './index.css';

class RootSelectInput extends Component {
  render() {
    const{SelectInput,handleChangeSelect}=this.props
    return (
      <div className="form-group SelectInput">
        <img src="search.png" alt=""/>
        <input type="text" className="form-control" value={SelectInput} placeholder="搜索" onChange={handleChangeSelect}/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  // 这里拿到的state就是store里面给的state
  return { 
    SelectInput:state.SelectInput
  }
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
  return { 
      handleChangeSelect:(e) =>{
      	var Ev =e.target; 
        var _value=Ev.value
        dispatch(changeSelectAction(_value))
      }
  }
}

let SelectInput = connect(
  mapStateToProps,
  mapDispatchToProps
)(RootSelectInput)
export default SelectInput; 
 