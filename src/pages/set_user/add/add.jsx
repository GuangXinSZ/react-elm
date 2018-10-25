import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {resetUserInfo} from '@/store/user/action'
import {getStore} from '@/utils/commons'
import './add.scss'
import API from '../../../api/api'


class Address extends Component {
  static propTypes = {
    resetUserInfo: PropTypes.func.isRequired,
    userInfo: PropTypes.object
  }
  state = {
    verify:false,			//姓名
    verifytwo:false,		//备注
    verifythree:false,		//地址
    verifyfour:false,		//电话
    verifyfive:false,
    vertifies: '',
    butopacity: ''
  }
  handleAdd = () => {

  }
  componentWillMount () {
  }
  render () {
    return (
      <div className='adddetail'>
          <form className='add-form'>
              <section className='ui-padding-block'>
                <div className='input-new'>
                  <input type="text" placeholder='请输入你的姓名' className={this.state.vertifies} value={this.state.message}/>
                  {this.state.vertify&&<p>请输入您的姓名</p>}
                </div>
                <Link to='/profile/setuser/add/addDetail' className='add-detail'>
                  <div className='input-new'>
                    <input type="text" placeholder='小区/写字楼/学校等' readOnly='readonly' value={this.state.addAddress}/>
                  </div>
                </Link>
                <div className='input-new'>
                  <input type="text" placeholder='请填写详细送餐地址' className={this.state.vertifies} value={this.state.message}/>
                  {this.state.verifythree&&<p>{this.state.sendaddresss}</p>}
                </div>
                <div className='input-new'>
                  <input type="text" placeholder='请填写能够联系到您的手机号' className={this.state.vertifies} value={this.state.message}/>
                  {this.state.verifyfour&&<p>{this.state.telephone}</p>}
                </div>
                <div className='input-new'>
                  <input type="text" placeholder='备用联系电话（选填）' className={this.state.vertifies} value={this.state.message}/>
                  {this.state.verifyfive&&<p>{this.state.standbytele}</p>}
                </div>
              </section>
              <section className='addbutton'>
                <button className={this.state.butopacity} onClick={this.handleAdd}>新增地址</button>
              </section>
          </form>
      </div>
    )
  }
}

export default connect(state => ({
  userInfo: state.userInfo
}), {
  resetUserInfo
})(Address)