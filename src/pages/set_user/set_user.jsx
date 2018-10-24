import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import Header from '@/components/header/header'
import {connect} from 'react-redux'
import API from '../../api/api'
import './set_user.scss'


class SetUser extends Component {
  static propTypes = {

  }
  state = {
    headerTitle: '',
    type: '',
    activeInput: '',
    activeText: '',
    fontopacity: ''
  }
  goBack = () => {
    this.props.history.goBack()
  }
  initData = () => {
    let type = this.props.location.pathname.split('/')[2]
    let headerTitle
    switch (type){
      case 'name':
        console.log(2222)
        headerTitle = '修改用户名'
        break
      default: 
        headerTitle = ''
    }
    this.setState({
      headerTitle,
      type
    })
  }
  resetName = () => {
    this.setState({
      activeInput: 'active-input',
      activeText: 'active-text',
      fontopacity: 'fontopacity'
    })
  }
  componentWillMount () {
    console.log(this.props.location, 'mar')
    this.initData()
  }
  render () {
    return (
      <div className='rating-page'>
        <Header title={this.state.headerTitle} goBack={this.goBack}/>
        {
          this.state.type==='name'&&<section className='setname'>
            <section className='setname-top'>
              <input type="text" placeholder='输入用户名' className={this.state.activeInput}/>
              <div>
                <p className={this.state.activeText}>用户只能修改一次(5~24字符之间)</p>
              </div>
            </section>
            <section className='reset'>
              <button className={this.state.fontopacity} onClick={this.resetName}>确认修改</button>
            </section>
          </section>
        }
      </div>
    )
  }
}

export default SetUser