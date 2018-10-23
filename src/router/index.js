import React, {Component} from 'react'
import {HashRouter, Switch, Route, Redirect} from 'react-router-dom'
import asyncComponent from '@/utils/asyncComponent'
import home from '@/pages/home/home'
import TransitionGroup from "react-transition-group/TransitionGroup"
const login = asyncComponent(() => import("@/pages/login/login"))
const profile = asyncComponent(() => import("@/pages/profile/profile"))
const info = asyncComponent(() => import("@/pages/info/info"))


export default class RouteConfig extends Component {

  firstChild = props => {
    const childrenArray = React.Children.toArray(props.children);
    return childrenArray[0] || null;
  };
  
  render () {
    return (
      <HashRouter>
        <Switch>
          <Route path="/" exact component= {login}/>
          <Route path="/profile"  component= {profile}/>
          <Route path="/info"  component= {info}/>
        </Switch>
      </HashRouter>
    )
  }
}