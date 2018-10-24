import React, {Component} from 'react'
import {HashRouter, Switch, Route, Redirect} from 'react-router-dom'
import asyncComponent from '@/utils/asyncComponent'
import home from '@/pages/home/home'
const login = asyncComponent(() => import("@/pages/login/login"))
const profile = asyncComponent(() => import("@/pages/profile/profile"))
const info = asyncComponent(() => import("@/pages/info/info"))
const setUser = asyncComponent(() => import("@/pages/set_user/set_user"))


export default class RouteConfig extends Component {

  render () {
    return (
      <HashRouter>
        <Switch>
          <Route path="/" exact component= {login}/>
          <Route path="/profile"  component= {profile}/>
          <Route path="/info"  component= {info}/>
          <Route path="/setuser"  component= {setUser}/>
        </Switch>
      </HashRouter>
    )
  }
}