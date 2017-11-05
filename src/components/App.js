import React, { Component } from 'react';
import store from '../store'
import { setCurrentUser } from '../actions'
import jwt from 'jsonwebtoken'

import Routes from './Routes'

export default class App extends Component {

  componentDidMount() {
    if (localStorage.ditaKey) {
      store.dispatch(
        setCurrentUser(jwt.decode(localStorage.ditaKey).user))
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
