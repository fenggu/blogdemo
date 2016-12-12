import React, { Component } from 'react';
import {  connect } from 'react-redux'; 
import './index.css'; 
class RootAplayer extends Component {
  componentDidMount() {
    const{Aplayer}=this.props
    Aplayer.element=document.getElementById('player4') 
     var ap4 = new APlayer(Aplayer);

  }
  render() {  
    return (
      <footer> 
        <div id="player4" className="aplayer"> </div>
      </footer>
    );
  }
}

function mapStateToProps(state) {
  // 这里拿到的state就是store里面给的state
  return { 
     Aplayer:state.APlayer
  }
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
  return {  
  }
}

let Aplayer = connect(
  mapStateToProps,
  mapDispatchToProps
)(RootAplayer)
export default Aplayer; 
 