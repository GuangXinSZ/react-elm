import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import './header.scss'
import PropTypes from 'prop-types'
import { spawn } from 'child_process';

class Header extends Component {
  static defaullProps = {
    goBack: true
  }
  static propTypes = {
    title: PropTypes.string.isRequired,
    signUp: PropTypes.bool,
    goBack: PropTypes.bool
  }
  state = {
    userInfo: '1',
    headTitle: '首页'
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

export default Header