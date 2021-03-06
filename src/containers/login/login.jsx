import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

//引入样式组件
import {
  NavBar,
  List,
  WingBlank,
  InputItem,
  Button,
  WhiteSpace
} from 'antd-mobile';

//引入组件logo
import Logo from '../../components/logo/logo';
import {login} from '../../redux/actions';


class Login extends Component{
  state = {
    username:'',
    password:''
  }
  handleChange = (name,val) =>{
    this.setState({
      [name]:val
    })
  }
  toRegister = () =>{
    this.props.history.replace('/register');
  }
  login = () =>{
    // console.log(this.state);
    this.props.login(this.state);
  }
  render(){
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
            <Button type='primary' onClick={this.login}>登&nbsp;&nbsp;&nbsp;陆</Button>
            <WhiteSpace/>
            <Button onClick={this.toRegister}>还没有账户</Button>
          </List>
        </WingBlank>
      </div>
    )
  }
}

export default connect(
  state=>({user:state.user}),
  {login}
)(Login);