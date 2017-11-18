import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Navbar from '../containers/Navbar'
import TestBed from './testerRoutines/TestBed'
import TestBedGoogle from './testerRoutines/TestBedGoogle'
import TestMover from './testerRoutines/TestMover'
import StoriesView from '../containers/storiesView'
import PostsView from '../containers/postsView'
import Login from './singleFunction/Login'
import SignupProfile from './singleFunction/SignupProfile'
import PostForm from './singleFunction/PostForm'
import Posts from './singleFunction/Posts'
import AllPosts from './singleFunction/AllPosts'
import AllPostsMap from './singleFunction/AllPostsMap'
import AllPostsByLoc from './singleFunction/AllPostsByLoc'
import TestDistance from './testerRoutines/TestDistance'
import PostDetail from './singleFunction/PostDetail'
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
        <Route exact path="/testmover" component={ TestMover } />
        <Route exact path="/storiesView" component={ StoriesView } />
        <Route exact path="/postsView" component={ PostsView } />
        <Route exact path="/posts" component={ PostForm } />
        <Route exact path="/myposts" component={ Posts } />  
        <Route exact path="/allposts" component={ AllPosts } />  
        <Route exact path="/allpostsmap" component={ AllPostsMap } />
        <Route exact path="/allpostsbyloc" component={ AllPostsByLoc } />  
        <Route exact path="/distancetest" component={ TestDistance } />  
        <Route path="/posts/:id" component={ PostDetail } />
        <Route exact path="/createstory" component={ CreateStory } />  
      </Switch>
    </div>
  )
}
