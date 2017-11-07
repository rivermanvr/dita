import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Navbar from '../containers/Navbar'
import TestBed from './testerRoutines/TestBed'
import TestBedGoogle from './testerRoutines/TestBedGoogle'
import Login from './singleFunction/Login'
import SignupProfile from './singleFunction/SignupProfile'
import PostForm from './singleFunction/PostForm'
import Posts from './singleFunction/Posts'
import Home from './singleFunction/Home'

export default function () {
  return (
    <div>
      {/* render on all paths */}
      <Route component={ Navbar } />

      {/* render only on specific paths */}
      <Switch>
        <Route exact path="/" component={ Home } />
        <Route exact path="/login" component={ Login } />
        <Route exact path="/signup" component={ SignupProfile } />
        <Route exact path="/profile" component={ SignupProfile } />
        <Route exact path="/testBed" component={ TestBed } />
        <Route exact path="/google" component={ TestBedGoogle } />
        <Route exact path="/posts" component={ PostForm } />
        <Route exact path="/myposts" component={ Posts } />        
      </Switch>
    </div>
  )
}
