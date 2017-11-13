import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Navbar from '../containers/Navbar'
import TestBed from './testerRoutines/TestBed'
import TestBedGoogle from './testerRoutines/TestBedGoogle'
import TestStories from './testerRoutines/TestStories'
import Login from './singleFunction/Login'
import SignupProfile from './singleFunction/SignupProfile'
import PostForm from './singleFunction/PostForm'
import Posts from './singleFunction/Posts'
import AllPosts from './singleFunction/AllPosts'
import CreateStory from './singleFunction/CreateStory'

export default function () {
  return (
    <div>
      {/* render on all paths */}
      <Route component={ Navbar } />

      {/* render only on specific paths */}
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/login" component={ Login } />
        <Route exact path="/signup" component={ SignupProfile } />
        <Route exact path="/profile" component={ SignupProfile } />
        <Route exact path="/testBed" component={ TestBed } />
        <Route exact path="/google" component={ TestBedGoogle } />
        <Route exact path="/testStories" component={ TestStories } />
        <Route exact path="/posts" component={ PostForm } />
        <Route exact path="/myposts" component={ Posts } />  
        <Route exact path="/allposts" component={ AllPosts } />  
        <Route exact path="/createstory" component={ CreateStory } />  
      </Switch>
    </div>
  )
}
