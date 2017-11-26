import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Navbar from '../containers/Navbar'
import TestBed from './testerRoutines/TestBed'
import TestBedGoogle from './testerRoutines/TestBedGoogle'
import TestMover from './testerRoutines/TestMover'
import StoriesView from '../containers/storiesView'
import PostsView from '../containers/postsView'
import Login from './singleFunction/Login'
import Profile from './singleFunction/Profile'
import Signup from './singleFunction/Signup'
import PostForm from './singleFunction/PostForm'
import Posts from './singleFunction/Posts'
import AllPosts from './singleFunction/AllPosts'
import AllPostsMap from './singleFunction/AllPostsMap'
import AllPostsByLoc from './singleFunction/AllPostsByLoc'
import TestDistance from './testerRoutines/TestDistance'
import PostDetail from './singleFunction/PostDetail'
import CreateStory from './singleFunction/CreateStory'
import MyLocations from './singleFunction/MyLocations'

export default function () {
  return (
    <div className="container">
      {/* render on all paths */}
      <Route path='/dev' component={ Navbar } />

      {/* render only on specific paths */}
      <Switch>
        <Route exact path="/dev/" component={ Login } />
        <Route exact path="/dev/login" component={ Login } />
        <Route exact path="/dev/signup" component={ Signup } />
        <Route exact path="/dev/profile" component={ Profile } />
        <Route exact path="/dev/testBed" component={ TestBed } />
        <Route exact path="/dev/google" component={ TestBedGoogle } />
        <Route exact path="/dev/testmover" component={ TestMover } />
        <Route exact path="/dev/storiesView" component={ StoriesView } />
        <Route exact path="/dev/postsView" component={ PostsView } />
        <Route exact path="/dev/posts" component={ PostForm } />
        <Route exact path="/dev/myposts" component={ Posts } />  
        <Route exact path="/dev/allposts" component={ AllPosts } />  
        <Route exact path="/dev/allpostsmap" component={ AllPostsMap } />
        <Route exact path="/dev/allpostsbyloc" component={ AllPostsByLoc } />  
        <Route exact path="/dev/distancetest" component={ TestDistance } />  
        <Route path="/dev/posts/:id" component={ PostDetail } />
        <Route exact path="/dev/createstory" component={ CreateStory } />  
        <Route exact path="/dev/mylocations" component={ MyLocations } />  
      </Switch>
    </div>
  )
}
