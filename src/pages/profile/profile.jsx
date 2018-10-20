import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Header from '@/components/header/header'


class Profile extends Component {
  static propTypes = {
    userInfo: PropTypes.object.isRequired
  }
  state = {
  }
  render () {
    return (
      <div className='profile-container'>
        <Header title="我的" goBack="true" />
        <section>
          <section className='profile-number'>
            <Link to={this.state.userInfo&&this.stateuserInfo.user_id?'/profile/info':'/login'} className='profile-link'>
              {this.state.userInfo&&this.state.userInfo.user_id&&<img src={this.state.imgBaseUrl + 'userInfo.avater'} alt='img is wrong' className='private-image' />}
            </Link>
          </section>
        </section>
      </div>
    )
  }
}

export default connect(state => ({
  userInfo: state.userInfo
}), {})(Profile)