/*
本质上是暴露多个action，包括：
  同步的action
  异步的action
 */
import {AUTH_SUCCESS,ERROR_MSG,RECEIVE_USER,RESET_USER} from './action-types';

//引入ajax的请求函数
import {reqRegister,reqLogin,reqUpdateUser,reqUser} from '../api';

//同步成功消息
const authSuccess = user =>({type:AUTH_SUCCESS,data:user});
//同步错误消息
const errorMsg = msg =>({type:ERROR_MSG,data:msg});
// 同步接接收用户信息的action
const receiveUser = user =>({type:RECEIVE_USER,data:user})
// 同步重置用户信息的action
const resetUser = msg =>({type:RESET_USER,data:msg})


//异步注册
export function register({username,password,type}) {
  return async dispatch =>{
    //执行异步，发送ajax请求,返回的是一个promise对象
    const response = await reqRegister({username,password,type})
    const result = response.data;
    //此时result有两个返回的结果  {code：1，msg:''}  || {code:0,data:user}
    if(result.code === 0){   //成功,分发同步的action
      const user = result.data;
      dispatch(authSuccess(user));
    }else{  //失败 ,分发同步的action
      const msg = result.msg;
      dispatch(errorMsg(msg));
    }
  }
}

//异步登录
export function login({username,password}) {
  return async dispatch =>{
    const response = await reqLogin({username,password});
    const result = response.data;
    if(result.code === 0){
      const user = result.data;
      dispatch(authSuccess(user));
    }else{
      const msg = result.msg;
      dispatch(errorMsg(msg));
    }
  }
}

//异步更新用户信息
export function updateUser (user) {
  return async dispatch=>{
    //发送ajax请求
    const response = await reqUpdateUser(user);
    const result = response.data;
    //返回响应
    if(result.code === 0){  //成功的响应
      const user = result.data;
      dispatch(receiveUser(user))
    }else{  //失败的响应
      const msg = result.data;
      dispatch(resetUser(msg));
    }
  }
}

//异步获取用户信息，根据cookies
export function getUser () {
  return async dispatch =>{
    const response = await reqUser();
    const result = response.data;
    if(result.code === 0){  //成功
      const user = result.data;
      dispatch(receiveUser(user))
    }else{
      const msg = result.data;
      dispatch(resetUser(msg));
    }
  }
}