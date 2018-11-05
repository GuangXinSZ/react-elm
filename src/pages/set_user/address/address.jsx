import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {resetUserInfo} from '@/store/user/action'
import { is, fromJS } from 'immutable';  // 保证数据的不可变
import {getStore} from '@/utils/commons'
import './address.scss'
import API from '../../../api/api'


class Address extends Component {
  static propTypes = {
    resetUserInfo: PropTypes.func.isRequired,
    userInfo: PropTypes.object
  }
  state = {
    refresh:false, //是否编辑状态
  }
  // 获取用户地址列表
  getAddress = async () =>{
    const res = await API.getAddress(getStore('user_id'))
    this.props.resetUserInfo('addressList', res)
  }
  handleDelete = (index) => {
    let hasAddressList = this.props.userInfo.hasAddressList
    hasAddressList.splice(index, 1)
    this.setState({
      refresh: !this.state.refresh
    })
    this.props.resetUserInfo('hasAddressList', hasAddressList)
  }
  componentWillMount () {
    this.getAddress()
  }

  shouldComponentUpdate(nextProps, nextState) {   // 判断是否要更新render, return true 更新  return false不更新
    return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state),fromJS(nextState))
  }

  render () {
    return (
      <div className='address'>
          <ul className='addresslist'>
            {
              this.props.userInfo.hasAddressList.map((item, index) => {
                return  (
                <li key={index}>
                <div>
                  <p>{item.address}</p>
                  <p><span>{item.telenum}</span>{item.standbytelenum&&<span>,{item.standbytelenum}</span>}</p>
                </div>
                {this.props.userInfo.operate === 'success'&&<div className='deletesite'>
                  <span onClick={this.handleDelete.bind(this, index)}>x</span>
                </div>}
                </li>
              )
              })
            }
          </ul>
          <Link to='/setuser/add/fromadd'>
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