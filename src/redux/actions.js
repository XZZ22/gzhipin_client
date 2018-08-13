/*
本质上是暴露多个action，包括：
  同步的action
  异步的action
 */
import {AUTH_SUCCESS,ERROR_MSG} from './action-types';

//引入ajax的请求函数
import {reqRegister,reqLogin} from '../api';

//同步成功消息
const authSuccess = user=>({type:AUTH_SUCCESS,data:user});
//同步错误消息
const errorMsg  = msg=>({type:ERROR_MSG,data:msg});

//异步注册
export function register({username,password,type}) {
  return dispatch =>{
    //执行异步，发送ajax请求,返回的是一个promise对象
    reqRegister({username,password,type}).then(response=>{
      const result = response.data;
      //此时result有两个返回的结果  {code：1，msg:''}  || {code:0,data:user}
      if(result.code === 0){   //成功,分发同步的action
        const user = result.data;
          dispatch(authSuccess(user));
      }else{  //失败 ,分发同步的action
        const msg = result.msg;
          dispatch(errorMsg(msg));
      }
    })
  }
}

//异步登录
export function login({username,password}) {
  return dispatch =>{
    reqLogin(username,password).then(response=>{
      const result = response.data;
      if(result.code === 0){
        const user = result.data;
        dispatch(authSuccess(user));
      }else{
        const msg = result.msg;
        dispatch(errorMsg(msg));
      }
    })
  }
}