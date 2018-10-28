import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import Header from '@/components/header/header'
import './msite.scss'
class Msite extends Component {
  static propTypes = {

  }
  state = {

  }
  render () {
    return (
      <div>
        <Header />
        <nav className='msite-nav'>
          <div className='food-types-container'>
            {
              [1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => {
                return (
                  <div className='food-item'></div>
                )
              })
            }
          </div>
        </nav>
        <div className='shop-list-container'>
          <header className='shop-header'>
            <div className='icon-shangdian'></div>
            <span className='shop-header-title'>附近商家</span>
          </header>
          <div className='skeleton'>
            <ul>
              {
                [1, 2, 3, 4].map((item, index) => {
                return (<li className='shop-li' key={index} >
                <div className='shop-img'></div>
                <div className='shop-progress'>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
                </li>)})
              }

            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Msite