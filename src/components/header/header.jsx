import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import './header.scss'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {getStore} from '../../utils/commons'
import API from '../../api/api'
import {saveUserInfo} from '@/store/login/action'

class Header extends Component {
  static defaullProps = {
    goBack: true
  }
  static propTypes = {
    title: PropTypes.string.isRequired,
    signUp: PropTypes.bool,
    goBack: PropTypes.bool,
    saveUserInfo: PropTypes.func.isRequired,
  }
  state = {
    userInfo: '1',
    headTitle: '首页'
  }
  getUserInfo = async () => {
    let res = await API.getUser()
    this.props.saveUserInfo(res)
  }
  componentDidMount () {
    this.getUserInfo()
  }
  render () {
    return (
      <header className="header-container">
        {this.props.goBack&&<div className="icon-back header-back"></div>}
        <div className="header-title">{this.props.title}</div>
        {this.props.signUp?(this.state.userInfo ? <span className='icon-account user-avatar'></span>
        : <span>登录|注册</span>):<span>&nbsp;</span>}
      </header>
    )
  }
}


export default connect(state => ({
}), {
  saveUserInfo,
})(Header)