/*
二级路由：
用户主界面路由
  大神：/dashen
  老板：/laoban

用户完善信息路由
  大神：/dasheninfo
  老板：/laobaninfo

注意：判断是否有header，
          如果有
             进入用户主界面   ---》 判断type进入老板或者大神界面
          没有
            进入用户完善信息界面  --》 判断type进入老板或者大神界面

 */

export function getRedirectPath(type, header) {
  //如果有header头像得话，跳转到信息界面，没有头像，跳转到注册登录界面
  let path = '';
  if(type === 'laoban'){
    path = '/laoban'
  }else{
    path = '/dashen'
  }

  if(!header){
    path += 'info';
  }

  return path;
}