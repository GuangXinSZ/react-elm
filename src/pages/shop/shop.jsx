import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import './shop.scss'
import PropTypes from 'prop-types'
import config from '@/config/envconfig'
import API from '@/api/api'
const imgUrl = config.imgUrl
class Shop extends Component {
  static propTypes = {
    userInfo: PropTypes.object.isRequired
  }
  state = {
    shopId: '',
    shopDetailData: ''
  }
  initData = async (id) => {
    let obj = {
      latitude: this.props.userInfo.geohash[0],
      longitude: this.props.userInfo.geohash[1]
    }
    let res = await API.shopDetails({}, id, obj)
    this.setState({
      shopDetailData: res,
      shopId: id
    })
  }
  componentWillMount () {
    console.log(this.props)
    let id = this.props.match.params.id
    this.initData(id)
  }
  render () {
    return (
      <div className='shop-container'>
        <div className='icon-back'></div>
        <header className='shop-detail-header'>
          <img src={imgUrl + this.state.shopDetailData.image_path} alt="" className='header-cover-img'/>
          <div className='description-header'>
            <Link to='/shop/shopDetail' className='description-top'>
              <div className='description-left'>
                <img src={imgUrl + this.state.shopDetailData.image_path} alt=""/>
              </div>
              <div className='description-right'>
                <h4 className='description-title'>{this.state.shopDetailData.name}</h4>
                <p className='description-text'>商家配送 / {this.state.shopDetailData.order_lead_time}分钟送达/配送费¥{this.state.shopDetailData.float_delivery_fee}</p>
                <p className='description-promotion'>公告: {}</p>
              </div>
            </Link>
          </div>
        </header>
      </div>
    )
  }
}

export default connect(state => ({
  userInfo: state.userInfo
}), {
  // resetUserInfo
})(Shop)