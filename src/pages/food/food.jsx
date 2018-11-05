import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import ShopList from '@/components/shop_list/shop_list'
import Header from '@/components/header/header'
import './food.scss'

class Food extends Component {
  static propTypes = {

  }
  state = {

  }
  goBack = () =>{
    this.props.history.push('/msite')
  }
  componentWillMount () {
  }
  render () {
    return (
      <div className='food-container'>
        <Header title={this.props.match.params.title} goBack={this.goBack}/>
        <ShopList geohash={this.props.match.params.geohash}/>
      </div>
    )
  }
}

export default Food