import React, { Component } from 'react';
import {  connect } from 'react-redux';
import { Link } from 'react-router'; 
import {topageAction,subpageAction,addpageAction} from '../../Redux/actions.js'
import './index.css';

class RootBurster extends Component {
  render() {
    const{BlogList,handleAddpage,handleSubpage,handleTopage}=this.props
    var BursterList=[] 
    for(let i=0;i<=BlogList.maxpage;i++){ 
              BursterList.push(i)  
        } 
    return (
      <div className="Burster">   
        <div className="btn-group">
            <span  className="btn btn-default" onClick={handleSubpage}>上一页</span>  
            {BursterList.map((bur,index)=>
                 <span key={index} onClick={handleTopage} className={BlogList.page==index?"btn btn-default act":"btn btn-default"}>{index+1}</span> 
            )}
            <span  className="btn btn-default" onClick={handleAddpage}>下一页</span>
         </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  // 这里拿到的state就是store里面给的state
  return {  
    BlogList:state.BlogList
  }
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
  return {  
      handleTopage:(e,index)=>{
        var target=e.target;  
        var value = target.innerHTML
        value=parseInt(value)-1 
        dispatch(topageAction(value))
      },
      handleAddpage:(e)=>{
        dispatch(addpageAction())
      },
      handleSubpage:(e) =>{
        dispatch(subpageAction()) 
      }
  }
}

let Burster = connect(
  mapStateToProps,
  mapDispatchToProps
)(RootBurster)
export default Burster; 
 