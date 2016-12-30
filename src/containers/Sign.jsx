import React, { Component } from 'react';
import { Link } from 'react-router';
import { adduserAction } from '../Redux/actions.js'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

import { Form, Icon, Input, Button, Checkbox } from 'antd';

const FormItem = Form.Item;

class RootSign extends Component {
    constructor(props) {
        super(props);
        var defaultState = {
            user: {
                username: "",
                password: "",
                password2: ""
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
        const { handleSign } = this.props
        var { user } = this.state 
        if(user.password != user.password2) {
          alert("两次密码输入不一致")
          return false
        } else {
          handleSign(user)
        }
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
                  <Input value={this.state.user.password2} onChange={this.onTextChange('password2')} addonBefore={<Icon type="lock" />} type="password" placeholder="Password" />
                
              </FormItem>

              <FormItem> 
                <Button type="primary" htmlType="submit" className="login-form-button">
                  Sign up
                </Button> 
              </FormItem> 
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
        handleSign: adduserAction
    }, dispatch)
}

let Sign = connect(
    mapStateToProps,
    mapDispatchToProps
)(RootSign);
 export { RootSign }
export default  Sign
