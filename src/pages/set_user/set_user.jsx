import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import Header from '@/components/header/header'
import {connect} from 'react-redux'
import API from '../../api/api'
import './set_user.scss'
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
    activeInput: '',
    activeText: '',
    fontopacity: ''
  }
  goBack = () => {
    this.props.history.goBack()
  }
  initData = () => {
    let type = this.props.location.pathname.split('/')[2]
    let headerTitle
    switch (type){
      case 'name':
        console.log(2222)
        headerTitle = '修改用户名'
        break
      default: 
        headerTitle = ''
    }
    this.setState({
      headerTitle,
      type
    })
  }
  handleInput = (e) => {
    let value = e.target.value 
    this.setState({
      name: value   // 是一个异步的过程, 不要在里面用e.target
    })
    this.inputValidate()
  }
  inputValidate = () => {
    let name = this.state.name
    if (name.length < 5 || name.length > 24) {
      this.setState({
        activeInput: 'active-input',
        activeText: 'active-text',
        fontopacity: ''
      })
      return false
    } else {
      this.setState({
        activeInput: '',
        activeText: '',
        fontopacity: 'fontopacity'
      })
      return true
    }
  }
  resetName = () => {
    let checkResult = this.inputValidate()
    if (!checkResult) {
      return
    }
    this.props.resetUserInfo('username', this.state.name)
    this.props.history.goBack()
  }
  componentWillMount () {
    this.initData()
  }
  render () {
    return (
      <div className='rating-page'>
        <Header title={this.state.headerTitle} goBack={this.goBack}/>
        {
          this.state.type==='name'&&<section className='setname'>
            <section className='setname-top'>
              <input type="text" placeholder='输入用户名' value={this.state.name} onChange={this.handleInput.bind(this)} className={this.state.activeInput}/>
              <div>
                {!this.state.activeText?<p>用户只能修改一次(5~24字符之间)</p>:
                <p className={this.state.activeText}>用户名长度在5到24位之间</p>}
              </div>
            </section>
            <section className='reset'>
              <button className={this.state.fontopacity} onClick={this.resetName}>确认修改</button>
            </section>
          </section>
        }
      </div>
    )
  }
}

export default connect(state => ({
  userInfo: state.userInfo
}), {
  resetUserInfo
})(SetUser)