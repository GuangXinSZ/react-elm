import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Header from '@/components/header/header'
import {saveAvander, saveUserInfo} from '@/store/user/action'
import './profile.scss'
import {getImgPath} from '../../utils/commons'
import API from '../../api/api'


class Profile extends Component {
  static propTypes = {
    userInfo: PropTypes.object.isRequired,
    saveAvander: PropTypes.func.isRequired,
    saveUserInfo: PropTypes.func.isRequired,
  }
  state = {
    username: '登录/注册',
    avatar: '',
    mobile: '暂无绑定手机',
    imgpath: '',
    imgUrl: '',
  }
  initData  = () => {
    let newState = {}
    if (this.props.userInfo && this.props.userInfo.user_id) {
      newState.avatar = this.props.userInfo.avatar
      newState.mobile = this.props.userInfo.mobile || '暂无手机绑定'
      newState.username = this.props.userInfo.username
      newState.imgUrl = '//elm.cangdu.org/img/1669599be6119829.jpg'
      newState.imgpath = this.props.userInfo.avatar.indexOf('/') !== -1? '/img/' + this.props.userInfo.avatar:getImgPath(this.props.userInfo.avatar)
    } else {
      newState.mobile = '暂无手机绑定'
      newState.username = '登录/注册'
    }
    this.setState(newState)
  }

  getUserInfo = async () => {
    let res = await API.getUser()
    this.props.saveUserInfo(res)
    this.initData()
    
  }
  componentDidMount () {
    this.getUserInfo()
  }
  render () {
    return (
      <div className='profile-container'>
        <Header title="我的" goBack="true" />
        <section >
          <section className='profile-number'>
            <Link to={this.props.userInfo&&this.props.userInfo.user_id?'/profile/info':'/login'} className='profile-link'>
              <img src={this.state.imgUrl} alt='img is wrong' className='private-image'/>
              <div className='user-info'>
                <p>{this.state.username}</p>
                <p>
                  <div className='icon-tel'></div>
                  <span className='icon-mobile-number'>{this.state.mobile}</span>
                </p>
              </div>
              <div className='icon-arrow-right'>
              </div>
            </Link>
          </section>
        </section>
      </div>
    )
  }
}

export default connect(state => ({
  userInfo: state.userInfo
}), {
  saveAvander,saveUserInfo
})(Profile)