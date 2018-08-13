/*
向外暴露的是一个整合后的reduces
 */

import {combineReducers} from 'redux';

//引入type
import {AUTH_SUCCESS,ERROR_MSG} from './action-types';

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
      return {...user,redirectTo:'/'};
    case ERROR_MSG:
      const msg = action.data;   //单独返回msg是一个字符串
      return {...state,msg};
    default:
    return state;
  }
}

export default combineReducers({
  user
})