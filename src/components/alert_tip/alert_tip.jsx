import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import './alert_tip.scss'


class AlertTip extends Component {
  static propTypes = {
    alertText: PropTypes.string.isRequired,
    closeTip: PropTypes.func.isRequired
  }
  state = {
    positionY: 0,
    timer: null
  }
  handleClick = () => {
    this.props.closeTip()
  }
  render () {
    return (
      <div className='alert-container'>
        <section className='tip-text-container'>
          <div className='tip-icon'>
            <span></span>
            <span></span>
          </div>
          <div className='tip-text'>{this.props.alertText}</div>
          <div className='confirm' onClick={this.handleClick}>确认</div>
        </section>
      </div>
    )
  }
}

export default AlertTip