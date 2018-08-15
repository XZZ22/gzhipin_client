import React,{Component} from 'react';
import {connect} from 'react-redux';

//引入界面需要的组件
import {NavBar, WingBlank,List,InputItem,TextareaItem,Button} from 'antd-mobile';

//引入头像选择的组件
import HeaderSelector from '../../components/header-selector/header-selector';

//引入action
import {updateUser} from '../../redux/actions';

//引入重定向
import {Redirect} from 'react-router-dom';

class DashenInfo  extends Component{
  state = {
    header: '', // 头像名称
    info: '', // 职位简介
    post: ''// 职位名称
  }
  handleChange = (name,val)=>{
    this.setState({
      [name]:val
    })
  }
  save = () =>{
    this.props.updateUser(this.state);
  }

  setHeader = (header) =>{
    this.setState({header});
  }

  render(){
    const {header} = this.props.user;
    if(header){
      return <Redirect to='/dashen'/>
    }
    return (
      <div>
        <NavBar>大神信息完善</NavBar>
        <HeaderSelector setHeader={this.setHeader}/>
        <WingBlank>
          <List>
            <InputItem onChange={val=>{this.handleChange('post',val)}}>求岗职位：</InputItem>
            <TextareaItem title="个人介绍:" rows={3} onChange={val=>{this.handleChange('info',val)}}></TextareaItem>
          </List>
        </WingBlank>
        <Button type='primary' onClick={this.save}>保存</Button>
      </div>
    )
  }
}
export default connect(
  state=>({user:state.user}),
  {updateUser}
)(DashenInfo);
