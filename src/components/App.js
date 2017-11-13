import React, { Component } from 'react';
import store from '../store'
import { loadUserData, fetchPosts, fetchUserPosts, fetchStorylines, fetchUserStorylines } from '../actions'
import jwt from 'jsonwebtoken'


import Routes from './Routes'

export default class App extends Component {

  componentDidMount() {
    store.dispatch(fetchPosts())
    store.dispatch(fetchStorylines())
    
    if (localStorage.ditaKey) {
      store.dispatch(loadUserData({ ditaKey: localStorage.ditaKey }))
      store.dispatch(fetchUserPosts())
      store.dispatch(fetchUserStorylines())
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
