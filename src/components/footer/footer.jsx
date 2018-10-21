import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import './footer.scss'

class Footer extends Component {
  static propTypes = {

  }
  state = {

  }
  render () {
    return (
      <section className='footer-container'>
        <div className='guide-item'>
          <div className='icon-changyonglogo40 icon-style'></div>
          <span className='spec-text'>外卖</span>
        </div>
        <div className='guide-item'>
          <div className='icon-zhinanzhen icon-style'></div>
          <span>搜索</span>
        </div>
        <div className='guide-item'>
          <div className='icon-dingdan icon-style'></div>
          <span>订单</span>
        </div>
        <div className='guide-item'>
          <div className='icon-account icon-style'></div>
          <span>我的</span>
        </div>
      </section>
    )
  }
}

export default Footer