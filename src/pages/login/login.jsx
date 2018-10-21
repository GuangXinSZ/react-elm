import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Header from '@/components/header/header'
import PropTypes from 'prop-types'
import './login.scss'
import {setStore} from '../../utils/commons'
import {saveUserInfo} from '@/store/user/action'
import API from '../../api/api'


class Login extends Component {
  static propTypes = {
    userInfo: PropTypes.object.isRequired,
    saveUserInfo: PropTypes.func.isRequired,
  }
  state = {
    mobileCode: '',
    userAccount: '',
    password: '',
    codeNumber: '',
    captchaCodeImg: '',
    showPwd: true,
    loginWay: false
  }
  handleInput = (type, event) => {
    let value = event.target.value
    let newState = {}
    newState[type] = value
    switch (type){
    }
    this.setState(newState)
  }

  mobileLogin = async () => {
    let data = {
      username: this.state.userAccount,
      password: this.state.password,
      captcha_code: this.state.codeNumber
    }
    let res = await API.accountLogin({}, data)
    setStore('user_id', res.user_id)
    this.props.saveUserInfo(res)
    this.props.history.push('/profile')
  }

  changePasswordType = () => {
    this.setState({
      showPwd: !this.state.showPwd
    })
  }
  getCaptchaCode = async () => {
    let res = await API.getCaptchaCode()
    this.setState({
      captchaCodeImg: res.code
    })
  }
  componentWillMount () {
    console.log(this.props, 'rpops')
    this.getCaptchaCode()
  }
  render() {
    return <div className="login-container">
        <Header title="密码登录" goBack="true" />
        {this.state.loginWay?<form className="login-form">
          <section className="input-container phone-number">
            <input type="text" placeholder="账户密码随便输入" name="phone" maxLength="11" value={this.state.mobileCode} />
            <button>获取验证码</button>
            {/* <button>已发送</button> */}
          </section>
        </form>:
      <form className="login-form">
        <section className="input-container">
          <input type="text" placeholder="账号" value={this.state.userAccount} onChange={this.handleInput.bind(this, 'userAccount')} />
        </section>
        <section className='input-container'>
          {this.state.showPwd?<input type="text" placeholder='密码' value={this.state.password} onChange={this.handleInput.bind(this, 'password')}/>:
              <input type="password" placeholder='密码' value={this.state.password} onChange={this.handleInput.bind(this, 'password')}/>}
          <div className={`button-switch ${this.state.showPwd?'change-to-text':''}`}>
            <div className={`circle-button ${this.state.showPwd?'trans_to_right':''}`} onClick={this.changePasswordType.bind(this)}></div>
            <span>abc</span>
            <span>...</span>
          </div>
        </section>
        <section className='input-container captcha-code-container'>
          <input type="text" placeholder='验证码' maxlength='4' value={this.state.codeNumber} onChange={this.handleInput.bind(this, 'codeNumber')} />
          <div className='img-change-img'>
            <img src={this.state.captchaCodeImg} alt="img is wrong"/>
            <div className='change-img' onClick={this.getCaptchaCode.bind(this)}>
              <p>看不清</p>
              <p>换一张</p>
            </div>
          </div>
        </section>
      </form>}
      <p className='login-tips'>
        温馨提示: 未注册过的账号, 登录时自动注册
      </p>
      <p className='login-tips'>
        注册过的用户可凭证账号密码登录
      </p>
      <div className='login-button' onClick={this.mobileLogin}>登录</div>
      <Link to='/forget' className='to-forget'>重置密码?</Link>
      </div>
  }
}

export default connect(state => ({
  userInfo: state.userInfo
}), {
  saveUserInfo,
})(Login)