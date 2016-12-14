import React, { Component } from 'react';
import {  connect } from 'react-redux';
import { Link } from 'react-router'; 
import {topageAction,subpageAction,addpageAction,getlistAction} from '../../Redux/actions.js'
import './index.css';

class RootBurster extends Component {
  render() {
    const{BlogList,handleAddpage,handleSubpage,handleTopage}=this.props
    var BursterList=[] 
    for(let i=0;i<=BlogList.maxpage;i++){ 
              BursterList.push(i)  
        } 
    var page=BlogList.page;
    var maxpage=BlogList.maxpage
    return (
      <div className="Burster">   
        <div className="btn-group">
            <span  className="btn btn-default" onClick={handleSubpage.bind(this,page,maxpage)}>上一页</span>  
            {BursterList.map((bur,index)=>
                 <span key={index} onClick={handleTopage} className={BlogList.page==index?"btn btn-default act":"btn btn-default"}>{index+1}</span> 
            )}
            <span  className="btn btn-default" onClick={handleAddpage.bind(this,page,maxpage)}>下一页</span>
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
        fetch('Blogs?page='+value, {  
            method: 'get',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
           }).then(function(response) { 
            return response.json();
          }).then(function(json){    
            dispatch(getlistAction(json)) 
          }).catch(function(err) {
              // 捕获错误
              console.log(err)
          }); 
      },
      handleAddpage:(e,page,maxpage)=>{ 
        console.log(page)
        if(page==maxpage) return false
        page=parseInt(page)  
        fetch('Blogs?page='+page, {  
            method: 'get',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
           }).then(function(response) { 
            return response.json();
          }).then(function(json){    
            dispatch(getlistAction(json)) 
          }).catch(function(err) {
              // 捕获错误
              console.log(err)
          }); 
      },
      handleSubpage:(e,page) =>{
        console.log(page)
        if(page==0) return false
        page=parseInt(page)-1  
        fetch('Blogs?page='+page, {  
            method: 'get',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
           }).then(function(response) { 
            return response.json();
          }).then(function(json){    
            dispatch(getlistAction(json)) 
          }).catch(function(err) {
              // 捕获错误
              console.log(err)
          }); 
      }
  }
}

let Burster = connect(
  mapStateToProps,
  mapDispatchToProps
)(RootBurster)
export default Burster; 
 