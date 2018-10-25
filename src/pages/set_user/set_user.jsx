import React, {Component} from 'react'
import {Link, Switch, Route, Redirect} from 'react-router-dom'
import PropTypes from 'prop-types'
import Header from '@/components/header/header'
import {connect} from 'react-redux'
import API from '../../api/api'
import './set_user.scss'
import Name from './name/name'
import Address from './address/address'
import Add from './add/add'
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
  initData = () => {
    let type = this.props.location.pathname.split('/')[2]
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
      default: 
        headerTitle = ''
    }
    this.setState({
      headerTitle,
      type
    })
  }
  editAddresss = () => {
    console.log('131313')
  }
  componentWillMount () {
    this.initData()
  }
  render () {
    return (
      <div className='rating-page'>
        <Header title={this.state.headerTitle} goBack={this.goBack} edit={this.state.type==='address'?this.editAddresss: null}/>
        {/* 子路由在父级配置，react-router4新特性，更加灵活 */}
        <Switch>
          <Route path={`${this.props.match.path}/name`} component={Name} />
          <Route path={`${this.props.match.path}/address`} component={Address} />
          <Route path={`${this.props.match.path}/add`} component={Add} />
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