import React from 'react';
import ReactDOM from 'react-dom';
import FastClick from 'fastclick'
import Route from './router/'
import {Provider} from 'react-redux'
import {AppContainer} from 'react-hot-loader'
import store from '@/store/store'
import * as serviceWorker from './serviceWorker';
import './config/rem'
import './style/base.scss'

FastClick.attach(document.body)


const render = Component => {
  ReactDOM.render(
    <Provider store={store}>
      <AppContainer>
        <Component/>
      </AppContainer>
    </Provider>,
    document.getElementById('root')
  )
}

render(Route)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
