/*
封装ajax请求函数模块
函数的返回值是promise对象
 */

import axios from 'axios';

export default function ajax(url = '',data = {},type = 'GET') {
  if(type === 'GET'){
    let dataStr = '' //数据拼接字符串
    //Object.keys()  得到指定对象所有属性名组成的数组
    //然后进行拼串
    Object.keys(data).forEach(key=>{
      const value = data[key];   //遍历每一个属性名，得到属性名
      dataStr += `${key}=${value}&`;
    })
    if(dataStr){
      dataStr = dataStr.substring(0,dataStr.length-1);
      //组成url串
      url += '?'+dataStr;
    }

    return axios.get(url);
  }else {
    return axios.post(url,data);
  }
}