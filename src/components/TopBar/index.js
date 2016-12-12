import React, { Component } from 'react';
import {Link} from 'react-router';
import './index.css';

export default class TopBar extends Component {
  render() {
    return (
		<header className="ty_title">
		    <Link to={this.props.href}>
		    <img src="img/blackback.png" alt=""/></Link>{this.props.title}<img src="../img/btn_share.png" alt="" style={{right:'1rem',width: '2rem',left: '90%'}}/>
		</header>
    );
  }
}