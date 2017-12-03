import React, { Component } from 'react';
import store from '../store'
import { loadUserData, fetchPosts, fetchStorylines } from '../actions'
import jwt from 'jsonwebtoken'


import Routes from './DevRoutes'

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
        {/* styles */}
        <link href="/public/css/allStyles.css" rel="stylesheet" />
        <link href="/vendor/bootstrap/dist/css/bootstrap.css" rel="stylesheet" />

        {/* app */}
        <h3>Welcome to Dita - Development Environment</h3>
        <Routes />
      </div>
    )
  }
}
