import React, { Component } from 'react';
import { Link } from 'react-router';
import { loginAction } from '../Redux/actions.js'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

import { Form, Icon, Input, Button, Checkbox } from 'antd';

const FormItem = Form.Item;

class RootLogin extends Component {
    constructor(props) {
        super(props);
        var defaultState = {
            user: {
                username: "",
                password: ""
            }
        }
        this.state = defaultState
    }

    onTextChange(key) {
        return e => {
            var user = this.state.user
            user[key] = e.target.value
            this.setState({ user })
            console.log(this.state)
        }
    }

    handleSubmit =e => {
        e.preventDefault();
        const { handleLogin } = this.props
        var { user } = this.state 
        handleLogin(user)
    }
    render() { 
        return ( 
            <Form onSubmit={this.handleSubmit} className="login-form">

              <FormItem> 
                  <Input value={this.state.user.username} onChange={this.onTextChange('username').bind(this)} addonBefore={<Icon type="user" />} placeholder="Username" />
                
              </FormItem>

              <FormItem> 
                  <Input value={this.state.user.password} onChange={this.onTextChange('password')} addonBefore={<Icon type="lock" />} type="password" placeholder="Password" />
                
              </FormItem>


              <FormItem> 
                <Button type="primary" htmlType="submit" className="login-form-button">
                  Log in
                </Button> 
              </FormItem>
              <Link to='/Sign'>To Sign up! </Link>
            </Form>
            );
    }
}; 

function mapStateToProps(state) {
    // 这里拿到的state就是store里面给的state
    return {}
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        handleLogin: loginAction
    }, dispatch)
}

let Login = connect(
    mapStateToProps,
    mapDispatchToProps
)(RootLogin);
 export { RootLogin }
export default  Login
