import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Header from '@/components/header/header'
import Footer from '@/components/footer/footer'
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
    balance: 0,            //我的余额
    count : 0,             //优惠券个数
    pointNumber : 0,       //积分数
  }
  initData  = () => {
    let newState = {}
    if (this.props.userInfo && this.props.userInfo.user_id) {
      newState.avatar = this.props.userInfo.avatar
      newState.mobile = this.props.userInfo.mobile || '暂无手机绑定'
      newState.username = this.props.userInfo.username
      newState.imgUrl = '//elm.cangdu.org/img/1669599be6119829.jpg'
      newState.balance = this.props.userInfo.balance
      newState.count = this.props.userInfo.gift_amount
      newState.pointNumber = this.props.userInfo.point
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
          <section className='info-data'>
            <ul className='clear'>
              <Link to='/balance' className='info-data-link'>
                <span className='info-data-top'><b>{parseInt(this.state.balance).toFixed(2)}</b>元</span>
                <span className='info-data-bottom'>我的余额</span>
              </Link>
              <Link to='/balance' className='info-data-link'>
                <span className='info-data-top'><b>{this.state.count}</b>个</span>
                <span className='info-data-bottom'>我的优惠</span>
              </Link>
              <Link to='/balance' className='info-data-link'>
                <span className='info-data-top'><b>{this.state.pointNumber}</b>分</span>
                <span className='info-data-bottom'>我的积分</span>
              </Link>
            </ul>
          </section>
          <section className='profile-list'>
            <Link to='order' className='myorder'>
              <div className='icon-dingdan order-icon'></div>
              <div className='myorder-text'>
                <span>我的订单</span>
                <div className='icon-arrow-right'></div>
              </div>
            </Link>
            <a href="https://home.m.duiba.com.cn/#/chome/index" className='myorder'>
              <div className='icon-jifen1 order-icon'></div>
              <div className='myorder-text'>
                <span>积分商城</span>
                <div className='icon-arrow-right'></div>
              </div>
            </a>
            <Link to='order' className='myorder'>
              <div className='icon-huangguan order-icon'></div>
              <div className='myorder-text'>
                <span>饿了么会员卡</span>
                <div className='icon-arrow-right'></div>
              </div>
            </Link>
            <Link to='order' className='myorder'>
              <div className='icon-yk_fangkuai_fill order-icon'></div>
              <div className='myorder-text'>
                <span>服务中心</span>
                <div className='icon-arrow-right'></div>
              </div>
            </Link>
            <Link to='order' className='myorder'>
              <div className='icon-changyonglogo40 order-icon'></div>
              <div className='myorder-text'>
                <span>下载饿了么APP</span>
                <div className='icon-arrow-right'></div>
              </div>
            </Link>
          </section>
        </section>
        <Footer/>
      </div>
    )
  }
}

export default connect(state => ({
  userInfo: state.userInfo
}), {
  saveAvander,saveUserInfo
})(Profile)