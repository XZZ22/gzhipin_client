/*
注册路由组件，本身是一个UI，但是我们要将他分装成一个容器组件暴露出去
 */
import React,{Component} from 'react';
import {connect} from 'react-redux';
//重定向
import {Redirect} from 'react-router-dom';

//引入样式组件
import {
  NavBar,
  List,
  WingBlank,
  InputItem,
  Radio,
  Button,
  WhiteSpace
} from 'antd-mobile';

//引入组件logo
import Logo from '../../components/logo/logo';

import {register} from '../../redux/actions';

/*
测试:
 */

class Register extends Component{
  state = {
    username:'',
    password:'',
    password2:'',
    type:'dashen'
  }
  handleChange = (name,val) =>{
    this.setState({
      [name]:val
    })
  }
  toLogin = () =>{
    this.props.history.replace('/login');
  }
  register = () =>{
    console.log(this.state);
    this.props.register(this.state);
}
  render(){
    const {type} = this.state;
    const {redirectTo,msg} = this.props.user;
    if(redirectTo){
      return <Redirect to={redirectTo}/>
    }
    return (
      <div>
        <NavBar>硅谷直聘</NavBar>
        <Logo/>
        <WingBlank>
          <List>
            <p>{msg}</p>
            <InputItem type='text' placeholder='请输入用户名' onChange={val => this.handleChange('username',val)}>用户名:</InputItem>
            <WhiteSpace/>
            <InputItem type='password' placeholder='请输入密码' onChange={val => this.handleChange('password',val)}>密码:</InputItem>
            <WhiteSpace/>
            <InputItem type='password' placeholder='请确认密码' onChange={val => this.handleChange('password2',val)}>确认密码:</InputItem>
            <WhiteSpace/>
            <List.Item>
              <span style={{marginRight:20}}>用户类型:</span>
              <Radio checked={type === 'dashen'} onChange={() => this.handleChange('type','dashen')}>大神</Radio>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Radio checked={type === 'laoban'} onChange={() => this.handleChange('type','laoban')}>老板</Radio>
            </List.Item>
            <WhiteSpace/>
            <Button type='primary' onClick={this.register}>注&nbsp;&nbsp;&nbsp;册</Button>
            <WhiteSpace/>
            <Button onClick={this.toLogin}>已有账户</Button>
          </List>
        </WingBlank>
      </div>
    )
  }
}

export default connect(
  state=>({user:state.user}),
  {register}//对象action中的方法
)(Register)