import React, { Component } from 'react';
import {  connect } from 'react-redux';
import { Link } from 'react-router';
import {changenavAction} from '../../Redux/actions.js'
import './index.css';

class RootMusicList extends Component {
  render() {
    const{MusicList,HandleChangeNav}=this.props
    return (
      <div className="MusicList">
          <header>我的歌单</header>
          {MusicList.map((MusicList,index)=>
              <div key={index}>
                <img src={MusicList.pic} alt=""/>
                <p>{MusicList.title}</p>
                <small>{MusicList.num}首</small> 
                <i className="iconfont">&#xe656;</i>
              </div>

              )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  // 这里拿到的state就是store里面给的state
  return { 
    MusicList:state.MusicList
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

let MusicList = connect(
  mapStateToProps,
  mapDispatchToProps
)(RootMusicList)
export default MusicList; 
 