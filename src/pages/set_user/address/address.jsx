import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {resetUserInfo} from '@/store/user/action'
import {getStore} from '@/utils/commons'

import './address.scss'
import API from '../../../api/api'


class Address extends Component {
  static propTypes = {
    resetUserInfo: PropTypes.func.isRequired,
    userInfo: PropTypes.object
  }
  state = {
    deletesite:false, //是否编辑状态
  }
  getAddress = async () =>{
    const res = await API.getAddress( {},getStore('user_id'))
    console.log(res)
    this.props.resetUserInfo('addressList', res)
  }
  componentWillMount () {
    this.getAddress()
  }
  render () {
    return (
      <div className='address'>
          <ul className='addresslist'>
            {
              this.props.userInfo.addressList.map((item, index) => {
                return  (<li>
                <div>
                  <p>{item.address}</p>
                  <p><span>{item.phone}</span>{item.phonepk&&<span>,{item.phonepk}</span>}</p>
                </div>
                {this.state.deletesite&&<div className='deletesite'>
                  <span>x</span>
                </div>}
              </li>)
              })
            }

          </ul>
          <Link to='/setuser/add'>
            <div className='addsite'>
              <span>新增地址</span>
              <div className='icon-arrow-right'></div>
            </div>
          </Link>
      </div>
    )
  }
}

export default connect(state => ({
  userInfo: state.userInfo
}), {
  resetUserInfo
})(Address)