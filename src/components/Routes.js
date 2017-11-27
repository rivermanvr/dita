import React from 'react'
import { Route, Switch } from 'react-router-dom'

/**************** components ****************/
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
/********************************************/

/****************** pages ******************/



/*******************************************/

export default function () {
  return (
    <div className="container">
      {/* render on all paths */}

      {/* render only on specific paths */}
      <Switch>
      </Switch>
    </div>
  )
}
