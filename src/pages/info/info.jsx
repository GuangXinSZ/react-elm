import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import { is, fromJS } from 'immutable';
import {connect} from 'react-redux'
import Header from '@/components/header/header'
import './info.scss'


class Info extends Component {
  static propTypes = {

  }
  state = {
    imgUrl: '//elm.cangdu.org/img/1669599be6119829.jpg'

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
          <Header title="账户消息" goBack={this.goBack} />
          <section className='profile-info'>
            <section className='headportrait'>
              <input type="file" className='profile-info-upload'/>
              <h2>头像</h2>
              <div className='info-avatar'>
                  <img src={this.state.imgUrl} alt="img id wrong" className='headport-top'/>
                  <div className='icon-arrow-right'></div>
              </div>
            </section>
          </section>
      </div>
    )
  }
}

export default Info