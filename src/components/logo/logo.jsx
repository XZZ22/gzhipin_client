import React,{Component} from 'react';

//引入图片
import logo from './logo.png';
//引入样式
import './logo.less';

//暴露
class Logo extends Component{
  render(){
    return (
      <div className="logo-container">
        <img src={logo} alt="logo" className='logo-img'/>
      </div>
    )
  }
}
export default Logo;