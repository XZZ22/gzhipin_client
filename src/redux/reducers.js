/*
向外暴露的是一个整合后的reduces
 */

import {combineReducers} from 'redux';

//引入type
import {AUTH_SUCCESS,ERROR_MSG,RECEIVE_USER,RESET_USER} from './action-types';

//引入重定向得path 路径
import {getRedirectPath} from '../utils';
const initUser={
  username:'',
  type:'',
  msg:'',  //错误信息
  redirectTo:''   //点击的时候是否发生页面跳转
}

function user(state = initUser,action) {
  switch (action.type) {
    case AUTH_SUCCESS:
      const user = action.data;
      //通过 path进行重定向
      return {...user,redirectTo:getRedirectPath(user.type,user.header)};
    case ERROR_MSG:
      const msg = action.data;   //单独返回msg是一个字符串
      return {...state,msg};
    case RECEIVE_USER:
      return action.data;
    case RESET_USER:
      return {...initUser,msg:action.data}
    default:
    return state;
  }
}

export default combineReducers({
  user
})


/*
三点运算符的作用：拆解/打包
  将数组或者对象拆
  将多个数组或者对象打包成一个整体，只能是同种类型的
 */