/*
路由主页面功能：
  主要渲染的两个路由组件
  通过浏览器缓存中是否含有userid，来判断用户是否已经进行了登录操作

 */
import React,{Component} from 'react';
import {Route,Switch,Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {NavBar} from 'antd-mobile'

import Cookies from 'js-cookie'

//引入两个组件
import LaobanInfo from '../laoban-info/laoban-info';
import DashenInfo from '../dashen-info/dashen-info';

import Laoban from '../laoban/laoban';
import Dashen from '../dashen/dashen';
import Personal from '../personal/personal';
import Message from '../message/message';

import NotFound from '../../components/not-found/not-found';
import NavFooter from '../../components/nav-footer/nav-footer';

//获取路径
import {getRedirectPath} from '../../utils';
import {getUser} from '../../redux/actions';

class Main extends Component{
  // 给组件对象添加属性
  navList = [
    {
      path: '/laoban', // 路由路径
      component: Laoban,
      title: '大神列表',
      icon: 'dashen',
      text: '大神',
    },
    {
      path: '/dashen', // 路由路径
      component: Dashen,
      title: '老板列表',
      icon: 'laoban',
      text: '老板',
    },
    {
      path: '/message', // 路由路径
      component: Message,
      title: '消息列表',
      icon: 'message',
      text: '消息',
    },
    {
      path: '/personal', // 路由路径
      component: Personal,
      title: '用户中心',
      icon: 'personal',
      text: '个人',
    }
  ]
//如果当前页面登录过，但是当前还没有登录，采取发送请求获取用户信息
  componentDidMount(){
    const userid = Cookies.get('userid');
    console.log(userid);
    const {user} = this.props;
    if(userid && !user._id){
      this.props.getUser()
    }
  }
  render(){

    //1、如果cookie中没有userid，直接跳转到登录页面
    //产看Cookies 中hi否有userid，如果没有，直接跳转到登录页面
    const userid = Cookies.get('userid');
    if(!userid){
      return <Redirect to='/login'/>
    }
    //2、state中的user中没有_id，发送请求获取当前的用户信息
    const {user} = this.props;
    console.log(user);
    if(!user._id){
      return <div>LOADING...</div>
    }
    //3、得到当前的请求的path
    const path = this.props.location.pathname;
    //4、判断请求路径是否是/
    if(path === '/'){
      return <Redirect to={getRedirectPath(user.type,user.header)}/>
    }

    //得到当前导航的对象，从而根据导航对象的内容，跳转到相应的路由
    const currentNav = this.navList.find((nav,index)=>nav.path === path);
    return (
      <div>
        {currentNav ? <NavBar>{currentNav.title}</NavBar>:null}
        <Switch>
          <Route path='/laobaninfo' component={LaobanInfo}/>
          <Route path='/dasheninfo' component={DashenInfo}/>


          <Route path='/laoban' component={Laoban}/>
          <Route path='/dashen' component={Dashen}/>
          <Route path='/personal' component={Personal}/>
          <Route path='/message' component={Message}/>
          <Route component={NotFound}/>
        </Switch>
        {currentNav ? <NavFooter/>:null}
      </div>
    )
  }
}

export default connect(
  state =>({user:state.user}),
  {getUser}
  )(Main);