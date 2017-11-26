import React, { Component } from 'react';
import store from '../store'
import { loadUserData, fetchPosts, fetchStorylines } from '../actions'
import jwt from 'jsonwebtoken'

import { Link } from 'react-router-dom'
import Routes from './Routes'

export default class App extends Component {

  componentDidMount() {
    store.dispatch(fetchPosts())
    store.dispatch(fetchStorylines())
    
    if (localStorage.ditaKey) {
      store.dispatch(loadUserData({ ditaKey: localStorage.ditaKey }))
    }
  }

  render() {
    return (
      <div className="container">
        <h3>Welcome to Dita (live) <Link to='/dev'>DEV</Link></h3>
        <Routes />
      </div>
    )
  }
}
