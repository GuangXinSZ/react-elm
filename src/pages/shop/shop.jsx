import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "./shop.scss";
import PropTypes from "prop-types";
import { is, fromJS } from 'immutable';  // 保证数据的不可变
import config from "@/config/envconfig";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import API from "@/api/api";
import {getImgPath} from '@/utils/commons'

const imgUrl = config.imgUrl;
class Shop extends Component {
  static propTypes = {
    userInfo: PropTypes.object.isRequired
  };
  state = {
    shopId: "",
    shopDetailData: "",
    show: false,
    active: 'food',
    activeIndex: 0,
    totalPrice: 0,
  };
  FirstChild = props => {
    const childrenArray = React.Children.toArray(props.children);
    return childrenArray[0] || null;
  }
  activeMenu = (index) => {
    this.setState({
      activeIndex: index
    })
  }
  initData = async id => {
    let obj = {
      latitude: this.props.userInfo.geohash[0],
      longitude: this.props.userInfo.geohash[1]
    };
    let res = await API.shopDetails({}, id, obj);
    let menu = await API.getfoodMenu({}, {restaurant_id: id})
    console.log(getImgPath(menu[0].icon_url))
    this.setState({
      shopDetailData: res,
      shopId: id,
      show: !this.state.show,
      menuList: menu
    });
  };
  changeShowType = (type) => {
    this.setState({
      active: type,
      show: !this.state.show
    })
  }
  
  componentWillMount() {
    console.log(this.props);
    let id = this.props.match.params.id;
    this.initData(id);
  }
  shouldComponentUpdate(nextProps, nextState){
    return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState))
  }
  render() {
    return (
      <div className="shop-container">
        <div className="icon-back" />
        <header className="shop-detail-header">
          <img
            src={imgUrl + this.state.shopDetailData.image_path}
            alt=""
            className="header-cover-img"
          />
          <div className="description-header">
            <Link to="/shop/shopDetail" className="description-top">
              <div className="description-left">
                <img
                  src={imgUrl + this.state.shopDetailData.image_path}
                  alt=""
                />
              </div>
              <div className="description-right">
                <h4 className="description-title">
                  {this.state.shopDetailData.name}
                </h4>
                <p className="description-text">
                  商家配送 / {this.state.shopDetailData.order_lead_time}
                  分钟送达/配送费¥
                  {this.state.shopDetailData.float_delivery_fee}
                </p>
                <p className="description-promotion">
                  公告: {this.state.shopDetailData.promotion_info}
                </p>
              </div>
              <div className="icon-arrow-right" />
            </Link>
            {this.state.shopDetailData ? (
              <footer className="description-footer">
                <p className='ellipsis'>
                  <span className="tip-icon">
                    {this.state.shopDetailData.activities[0].icon_name}
                  </span>
                  <span>
                    {this.state.shopDetailData.activities[0].description}
                    (APP专享)
                  </span>
                </p>
                <p className='footer-activities'>{this.state.shopDetailData.activities.length}个活动</p>
                <p className='icon-arrow-right'></p>
              </footer>
            ) : ("")}
          </div>
        </header>
        <div className='change-show-type'>
          <div><span onClick={this.changeShowType.bind(this, 'food')} className={this.state.active==='food'?'activity-show':''}>商品</span></div>
          <div><span onClick={this.changeShowType.bind(this, 'rating')} className={this.state.active==='rating'?'activity-show':''}>评价</span></div>
        </div>
        <ReactCSSTransitionGroup
          component={this.FirstChild}
          transitionName="shop"
          transitionEnterTimeout={600}
          transitionLeaveTimeout={300}>
               {this.state.show&&<div className='food-container'>
                <div className='menu-container'>
                    <div className="menu-left">
                      <ul>
                        {
                          this.state.menuList.map((item, index) => {
                            return (
                              <li className={this.state.activeIndex===index?'activity-menu menu-left-li': 'menu-left-li'} key={index} onClick={this.activeMenu.bind(this, index)}>
                                <img src={item.icon_url?getImgPath(item.icon_url):''} alt=""/>
                                <span>{item.name}</span>
                                <span className='category'></span>
                              </li>
                            )
                          })
                        }
                      </ul>
                    </div>
                    <div className="menu-right">
                        <ul>
                          {
                            this.state.menuList.slice(this.state.activeIndex, this.state.activeIndex + 1 ).map((item, index) => {
                              return (
                                <li>
                                <header className='menu-detail-header'>
                                  <div className="menu-detail-header-left">
                                    <strong className="menu-item-title">{item.name}</strong>
                                    <span className="menu-item-description">{item.description}</span>
                                  </div>
                                  <span className="menu-detail-header-right"></span>
                                  {/* <p className='description-tip'>
                                    <span>{item.name}</span>
                                    {item.description}
                                  </p> */}
                                </header>
                                {
                                  item.foods.map((food, foodIndex)=> {
                                    return (
                                      <div className='menu-detail-list'>
                                        <Link to='/shop/foodDetail' className='menu-detail-link'>
                                          <div className='menu-food-img'>
                                            <img src={imgUrl+ food.image_path} alt=""/>
                                          </div>
                                          <div className='menu-food-description'>
                                            <h3 className="food-description-head">
                                              <strong className='description-foodname'>{food.name}</strong>
                                              {
                                                food.attributes.length?<ul className='attributes-ul'>
                                                  {
                                                    food.attributes.map((attribute, fIndex) => {
                                                      return (
                                                        <li key={fIndex}  className={attribute.icon_name==='新'?'attribute-new':''}>
                                                          <p>{attribute.icon_name}</p>
                                                        </li>
                                                      )
                                                    })
                                                  }
                                                </ul>:''
                                              }
                                            </h3>
                                            <p className="food-description-content">{food.description}</p>
                                            <p className='food-description-sale-rating'>
                                              <span>月售{food.month_sales}份</span>
                                              <span>好评率{food.satisfy_rate}%</span>
                                            </p>
                                            {food.activity&&<p className='food-activity'>
                                                <span>{food.activity.image_text}</span>
                                            </p>}
                                          </div>
                                        </Link>
                                        <footer className='menu-detail-footer'>
                                              <div className="food-price">
                                                <span>¥</span>
                                                <span>{food.specfoods[0].price}</span>
                                                {food.specifications.length?<span>起</span>:''}
                                              </div>
                                        </footer>
                                      </div>
                                    )
                                  })
                                }
                                </li>
                              )
                            })
                          }
                        </ul>
                    </div>
                </div>
                <div className="buy-cart-container">
                  <div className='cart-icon-num'>
                    <div className="cart-icon-container">
                      <span className='cart-list-length'>1</span>
                      <div className='icon-ziyuan'></div>
                    </div>
                    <div className='cart-num'>
                      <div>¥{this.state.totalPrice}</div>
                      <div>配送费¥{this.state.deliveryFee}</div>
                    </div>
                  </div>
                  <div className="gotopay">
                      <div className='gotopay-button-style'>还差¥{}</div>
                      <div className='gotopay-button-style'>去结算</div>
                  </div>
                </div>
               </div>}
      </ReactCSSTransitionGroup>
      </div>
    );
  }
}

export default connect(
  state => ({
    userInfo: state.userInfo
  }),
  {
  }
)(Shop);
