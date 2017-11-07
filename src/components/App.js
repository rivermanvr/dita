import React, { Component } from 'react';
import store from '../store'
import { loadUserData } from '../actions'
import jwt from 'jsonwebtoken'

import Routes from './Routes'

export default class App extends Component {

  componentDidMount() {
    if (localStorage.ditaKey) {
      store.dispatch(
        loadUserData({ ditaKey: localStorage.ditaKey }))
    }
  }

  render() {
    return (
      <div className="container-fluid">
        <h3>Welcome to Dita</h3>
        <Routes />
      </div>
    )
  }
}
