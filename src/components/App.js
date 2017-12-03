import React, { Component } from 'react';
import store from '../store'
import { loadUserData, fetchPosts, fetchStorylines, fetchUsers } from '../actions'
import jwt from 'jsonwebtoken'

import { Link } from 'react-router-dom'
import Routes from './Routes'
import Nav from './Nav'

export default class App extends Component {

  componentDidMount() {
    store.dispatch(fetchPosts())
    store.dispatch(fetchStorylines())
    store.dispatch(fetchUsers())
    
    if (localStorage.ditaKey) {
      store.dispatch(loadUserData({ ditaKey: localStorage.ditaKey }))
    }
  }

  render() {
    return (
      <div>
        {/* styles */}
        <link href="/public/css/style.css" rel="stylesheet" />

        {/* top nav */}
        <Nav />

        {/* temp headline */}
        {/* <h3>Welcome to Dita (live) <Link to='/dev'>DEV</Link></h3> */}

        {/* Routes */}
        <Routes />
      </div>
    )
  }
}
