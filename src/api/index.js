/*
包含n个请求函数接口的模块，他是一个对象，需要哪个函数直接调用使用就可以
 */
import ajax from './ajax';


export const reqRegister = ({username,password,type})=>ajax('/register',{username,password,type},'POST');
export const reqLogin = ({username,password})=>ajax('/login',{username,password},'POST');