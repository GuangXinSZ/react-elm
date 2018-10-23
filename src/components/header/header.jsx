import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import './header.scss'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'


class Header extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    signUp: PropTypes.bool,
    goBack: PropTypes.func,
  }
  state = {
    userInfo: '1',
    headTitle: '首页'
  }
  handleBack = () => {
    console.log(this.props.history)
    this.props.goBack()
  }
  render () {
    return (
      <header className="header-container">
        {this.props.goBack&&<div className="icon-back header-back" onClick={this.handleBack}></div>}
        <div className="header-title">{this.props.title}</div>
        {this.props.signUp?(this.state.userInfo ? <span className='icon-account user-avatar'></span>
        : <span>登录|注册</span>):<span>&nbsp;</span>}
      </header>
    )
  }
}

export default connect(state => ({
}), {
})(Header)