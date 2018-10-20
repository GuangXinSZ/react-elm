import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import Header from '@/components/header/header'


class Home extends Component {
  static propTypes = {

  }
  state = {
    positionY: 0,
    timer: null
  }
  render () {
    return (
      <div className='alert-container'>

      </div>
    )
  }
}

export default Home