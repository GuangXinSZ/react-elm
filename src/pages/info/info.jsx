import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import { is, fromJS } from 'immutable';
import {connect} from 'react-redux'
import Header from '@/components/header/header'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';  // react的css动画组件
import './info.scss'


class Info extends Component {
  static propTypes = {

  }
  state = {

  }
    // css动画组件设置为目标组件
  FirstChild = props => {
    console.log(props)
    const childrenArray = React.Children.toArray(props.children);
    console.log(childrenArray)
    return childrenArray[0] || null;
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
      <div>
        <ReactCSSTransitionGroup
          // component='div'
          transitionName="info"
          transitionEnterTimeout={300}
          transitionLeaveTimeout={300}>
          <Header title="账户消息" goBack={this.goBack} />
          <div >1232321321</div>
          <div >1232321321</div>
          <div >1232321321</div>
          <div >1232321321</div>


        </ReactCSSTransitionGroup> 
      </div>
    )
  }
}

export default Info