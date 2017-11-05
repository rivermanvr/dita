import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
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
// needs to be moved to Routes import TestBed from './singleFunction/TestBed';
  // <Route exact path="/testBed" component={ TestBed } />
