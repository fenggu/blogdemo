import React, { Component } from 'react';
import { Link ,browserHistory } from 'react-router';
import { Menu, Dropdown, Icon } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { getuser, searchBlog , getlistAction } from '../Redux/actions.js'
import { Input } from 'antd'; 
class RootTopBar extends Component {
    constructor(props) {
        super(props); 
    }
    render() {
        var { pid, user, signout, auther, searchBlog ,patchList} = this.props 
        const handlesignout = e => {
          var defaultuser = { 
              login: false,
              username: ""
          }
          signout(defaultuser)
          alert('退出成功')
        }
        const handleBlog = e => {
          patchList(0)
          browserHistory.push('/')
        }
        return ( 
            <header className="top-bar">  
               <a><h1 onClick={handleBlog.bind(this,0)}>Blog</h1></a> 
               <Input.Search   placeholder="请输入标题关键字" onSearch={value => searchBlog(value,0)} />
               <Link className={user.login?"new":"hide"}  to="/addnewblog" >
                  <span>新建</span>
               </Link>
               <Link className={ pid&&(user.username==auther)? "new" : "hide" }  to={'/addnewblog/' + pid} >
                  <span>编辑</span>
               </Link>
               <Link className={user.login?"hide":"new"} to={'/Login'}  >
                  <span>登录</span>
               </Link>

              <Dropdown  overlay={(
                  <Menu>
                    <Menu.Item key="0"> 
                      <span onClick={searchBlog.bind(this,user.username,0)}>关于我的</span>
                    </Menu.Item> 
                    <Menu.Divider />
                    <Menu.Item key="1" >
                      <span onClick={handlesignout.bind(this)}>退出登录</span>
                    </Menu.Item>
                  </Menu>
                )} trigger={['click']}>
                <a className={user.login?"ant-dropdown-link new":"hide"} href="#">
                  {user.username} <Icon type="down" />
                </a>
              </Dropdown>

            </header>
        )
    }
}

function mapStateToProps(state) { 
    return {
        user: state.user,
        auther : state.innerblog.auther
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ 
      signout:getuser,
      searchBlog:searchBlog,
      patchList:getlistAction
    }, dispatch)
}

let TopBar = connect(
    mapStateToProps,
    mapDispatchToProps
)(RootTopBar);
export { RootTopBar }
export default  TopBar