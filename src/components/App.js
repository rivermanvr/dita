import React, { Component } from 'react';
import store from '../store'
import { loadUserData, fetchPosts, fetchUserPosts, fetchStorylines } from '../actions'
import jwt from 'jsonwebtoken'


import Routes from './Routes'

export default class App extends Component {

  componentDidMount() {
    store.dispatch(fetchPosts())
    store.dispatch(fetchUserPosts())
    store.dispatch(fetchStorylines())
    
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
