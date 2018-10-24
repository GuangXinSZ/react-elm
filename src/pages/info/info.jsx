import React, {Component} from 'react'
import {Link, Switch, Route} from 'react-router-dom'
import { is, fromJS } from 'immutable';
import AlertTip from '@/components/alert_tip/alert_tip'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import QueueAnim from 'rc-queue-anim'
import Header from '@/components/header/header'
import {saveImg} from '@/store/user/action'
import envconfig from '@/config/envconfig';   // 环境变量的配置
import API from '../../api/api'
import './info.scss'


class Info extends Component {
  static propTypes = {
    saveImg: PropTypes.func,
    userInfo: PropTypes.object.isRequired
  }
  state = {
    imgUrl: '//elm.cangdu.org/img/1669599be6119829.jpg',
    hasAlert: false,
  }
    /*
  上传图片，并将图片地址存到redux，保留状态
   */
  uploadImg = async event => {
    try{
      let formdata = new FormData();  // 获取表单
      formdata.append('file', event.target.files[0]);  // 上传的文件
      let result = await API.uploadImg({data: formdata});
      this.props.saveImg(envconfig.imgUrl + result.image_path);
      console.log(result);
    }catch(err){
      console.error(err);
    }
  }

  goBack = () => {
    this.props.history.goBack()
  }
  componentWillMount () {
    console.log(this.props)
    console.log(this.state)
  }
  shouldComponentUpdate(nextProps, nextState) {
    return !is(fromJS(this.props), fromJS(nextProps))|| !is(fromJS(this.state),fromJS(nextState))
  }
  render () {
    return (
      <div className='rating-page'>
        <QueueAnim type='bottom'>
          <Header title="账户消息" goBack={this.goBack} key='o1'/>
          <section className='profile-info' key=''o2>
          <QueueAnim>
            <section className='headportrait' key='k1'>
              <input type="file" className='profile-info-upload' onChange={this.uploadImg}/>
              <h2>头像</h2>
              <div className='info-avatar'>
                  <img src={this.props.userInfo.imgpath} alt="img id wrong" className='headport-top'/>
                  <div className='icon-arrow-right'></div>
              </div>
            </section>
            <Link to='/setuser/name' className='info-router' key='k2'>
              <section className='headportrait headportraitwo'>
                <h2>用户名</h2>
                <div className='info-avatar'>
                  <div>{this.state.username}</div>
                  <div className='icon-arrow-right'></div>
                </div>
              </section>
            </Link>
            <Link to='/info/setusername' className='info-router' key='k3'>
              <section className='headportrait headportraithree'>
                <h2>收获地址</h2>
                <div className='info-avatar'>
                  <div>{this.state.username}</div>
                  <div className='icon-arrow-right'></div>
                </div>
              </section>
            </Link>
            <section class="bind-phone" key='k4'>
                账号绑定
            </section>
            <Link to='/info/setusername' className='info-router' key='k5'>
              <section className='headportrait headportraitfour'>
                <div className='headport-phone'>
                  <div className='icon-shouji'></div>
                  <h2>手机</h2>
                </div>
                <div className='info-avatar'>
                  <div className='icon-arrow-right'></div>
                </div>
              </section>
            </Link>
            <section class="bind-phone" key='k5'>
                安全设置
            </section>
            <Link to='/info/setusername' className='info-router' key='k6'>
              <section className='headportrait headportraithree'>
                <h2>登录密码</h2>
                <div className='info-avatar'>
                  <div className='headport-modify'>修改</div>
                  <div className='icon-arrow-right'></div>
                </div>
              </section>
            </Link>
            <section className='exit-login' key='k7'>退出登录</section>
             </QueueAnim>
          </section>
      {this.state.hasAlert&&<AlertTip closeTip={this.closeTip} alertText={this.state.alertText}/>}
      </QueueAnim>
      </div>
    )
  }
}

export default connect(state => ({
  userInfo: state.userInfo
}), {
  saveImg
})(Info)