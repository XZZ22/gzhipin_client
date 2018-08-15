/*
列表UI组件
 */

import React,{Component} from 'react';
import {Grid,List} from 'antd-mobile';
import PropTypes from 'prop-types';

export default class HeaderSelector  extends Component{

  static propTypes = {
    setHeader:PropTypes.func.isRequired
  }

  state = {
    icon:null  //设置头像对象
  }

  selectHeader = ({text,icon})=>{
    //设置头像对象
    this.setState({icon});
    //设置头像文本
    this.props.setHeader(text);
  }

  constructor(props){
    super(props);

    //初始化头像列表
    this.headerList =[];
    for (let i=0;i<20;i++){
      const text = `头像${i+1}`;
      const icon = require(`./images/${text}.png`);
      this.headerList.push({text,icon});
    }
  }

  render(){
    //获取当前的头像，
    const {icon} = this.state;
    //如果有头像，返回当前头像标签并显示，如果没有，给一个值：请选择头像
    const head = icon ? <div>当前头像为：<img src={icon} alt='icon'/></div> : '请选择头像';
    return (
      <div>
        <List renderHeader={ ()=> head} >
          <Grid data={this.headerList}
                columnNum={5}
                onClick={this.selectHeader}>
          </Grid>
        </List>
      </div>
    )
  }
}