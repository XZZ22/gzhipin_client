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

class LaobanInfo extends Component{
  state = {
    header: '', // 头像名称
    info: '', // 职位简介
    post: '', // 职位名称
    company: '', // 公司名称
    salary: '' // 工资
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
      return <Redirect to='/laoban'/>
    }
    return (
      <div>
        <NavBar>老板信息完善</NavBar>
        <HeaderSelector setHeader={this.setHeader}/>
        <WingBlank>
          <List>
            <InputItem onChange={val=>{this.handleChange('post',val)}}>招聘职位：</InputItem>
            <InputItem onChange={val=>{this.handleChange('company',val)}}>公司名称：</InputItem>
            <InputItem onChange={val=>{this.handleChange('salary',val)}}>职位薪资：</InputItem>
            <TextareaItem title="职位要求:" rows={3} onChange={val=>{this.handleChange('info',val)}}></TextareaItem>
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
)(LaobanInfo);
