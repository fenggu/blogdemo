import React, { Component } from 'react';
import {  connect } from 'react-redux';
import { Link } from 'react-router'; 
import { bindActionCreators } from 'redux';
import { topageAction, subpageAction, addpageAction, getlistAction } from '../Redux/actions.js'

class RootBurster extends Component {
  render() {
    const{ bloglist, getlist, patchList, handleTopage }=this.props
    var BursterList = [] 
    for(let i = 0; i <= bloglist.maxpage; i ++){ 
              BursterList.push(i)  
        } 
    var page = bloglist.page;
    var maxpage = bloglist.maxpage 

    const handleAddPage = () => {
      let page = bloglist.page
      var maxpage = bloglist.maxpage 
      if(page == maxpage) {
        return false 
      }
      page = page + 1
      handleTopage(page)
      getlist(page, patchList)
    }

    const handleSubPage = () => {
      let page = bloglist.page 
      if(page == 0) {
        return false 
      }
      page = page - 1
      handleTopage(page)
      getlist(page, patchList)
    }

    const handleTo = (page) => {  
      handleTopage(page)
      getlist(page, patchList)
    }

    return (
      <div className="Burster">   
        <div className="btn-group">
            <span  className="btn btn-default" onClick={ handleSubPage }>上一页</span>  
            {BursterList.map((bur,index)=>
                 <span key={index} onClick={ handleTo.bind(this, index) } className={bloglist.page == index ? "btn btn-default act": "btn btn-default" }>{index + 1}</span> 
            )}
            <span  className="btn btn-default" onClick={ handleAddPage }>下一页</span>
         </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  // 这里拿到的state就是store里面给的state
  return {  
    bloglist:state.bloglist
  }
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
      handleTopage: topageAction,  
      patchList:getlistAction
    }, dispatch)
}

let Burster = connect(
  mapStateToProps,
  mapDispatchToProps
)(RootBurster)
export default Burster; 
 