import React, {Component} from 'react'
import {Link, Switch, Route, Redirect} from 'react-router-dom'
import PropTypes from 'prop-types'
import Header from '@/components/header/header'
import {connect} from 'react-redux'
import API from '../../api/api'
import { is, fromJS } from 'immutable';  // 保证数据的不可变
import './set_user.scss'
import Name from './name/name'
import Address from './address/address'
import Add from './add/add'
import AddDetail from './add_detail/add_detail'
import {resetUserInfo} from '@/store/user/action'

class SetUser extends Component {
  static propTypes = {
    resetUserInfo: PropTypes.func.isRequired,
    userInfo: PropTypes.object
  }
  state = {
    headerTitle: '',
    type: '',
    name: '',
  }
  goBack = () => {
    this.props.history.goBack()
  }
  initData = (props) => {
    let type = props.location.pathname.split('/')[2]
    let headerTitle
    switch (type){
      case 'name':
        headerTitle = '修改用户名'
        break
      case 'address':
        headerTitle = '编辑地址'
        break
      case 'add':
        headerTitle = '新增地址'
        break
      case 'add_detail':
        headerTitle = '搜索地址'
        break
      default: 
        headerTitle = ''
    }
    this.setState({
      headerTitle,
      type
    })
  }
  editAddresss = () => {
    this.props.resetUserInfo('operate', 'delete')
  }
  componentWillMount () {
    this.initData(this.props)
  }
  componentWillReceiveProps(nextProps){  // 属性props改变时候触发
    if(!is(fromJS(this.props.location.pathname), fromJS(nextProps.location.pathname))){   //
      this.initData(nextProps);
    }
  }
  shouldComponentUpdate(nextProps, nextState) {   // 判断是否要更新render, return true 更新  return false不更新
    return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state),fromJS(nextState))
  }
  render () {
    return (
      <div className='rating-page'>
        <Header title={this.state.headerTitle} goBack={this.goBack} edit={this.state.type==='address'?this.editAddresss: null}/>
        {/* 子路由在父级配置，react-router4新特性，更加灵活 */}
        <Switch>
          <Route path={`${this.props.match.path}/name`} component={Name} />
          <Route path={`${this.props.match.path}/address`} component={Address} />
          <Route path={`${this.props.match.path}/add/:type`} component={Add} />
          <Route path={`${this.props.match.path}/add_detail`} component={AddDetail} />
        </Switch>
      </div>
    )
  }
}

export default connect(state => ({
  userInfo: state.userInfo
}), {
  resetUserInfo
})(SetUser)