import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import './loader.scss'

class Loader extends Component {
  static propTypes = {

  }
  state = {
    positionY: 0,
    timer: null
  }
  handleClick = () => {
    this.props.closeTip()
  }
  handleLogout = () => {
    this.props.logout()
  }
  render () {
    return (
      <div className='loader-container'>
        <div className='loader-inner'></div>
      </div>
    )
  }
}

export default Loader