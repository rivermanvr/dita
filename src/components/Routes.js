import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { AnimatedSwitch, AnimatedRoute } from 'react-router-transition'

/**************** components ****************/
import Navbar from '../containers/Navbar'
import TestBed from './testerRoutines/TestBed'
import TestBedGoogle from './testerRoutines/TestBedGoogle'
import TestMover from './testerRoutines/TestMover'
import StoriesView from '../containers/storiesView'
import PostsView from '../containers/postsView'
import PostForm from './singleFunction/PostForm'
import Posts from './singleFunction/Posts'
import AllPosts from './singleFunction/AllPosts'
import AllPostsMap from './singleFunction/AllPostsMap'
import AllPostsByLoc from './singleFunction/AllPostsByLoc'
import TestDistance from './testerRoutines/TestDistance'
import PostDetail from './singleFunction/PostDetail'
import CreateStory from './singleFunction/CreateStory'
/********************************************/

/****************** pages ******************/
import Login from './pages/Login'
import Signup from './pages/Signup'
import Profile from './pages/Profile'
import Dashboard from './pages/Dashboard'
import AddPost from './pages/AddPost'
import MyLocations from './pages/dashboardComponents/MyLocations'
import MyPosts from './pages/dashboardComponents/DashboardMyPosts'
import Home from './pages/Home'

/*******************************************/

export default function () {
  return (
    <main>
      {/* render on all paths */}

      {/* render only on specific paths */}
      <Switch>
        <Route exact path='/login' component={ Login } />
        <Route exact path='/signup' component={ Signup } />
        <Route exact path='/profile' component={ Profile } />
        <Route exact path='/posts/:id' component={ PostDetail } />
        <Route path='/dashboard' component={ Dashboard } />
        <Route exact path='/addpost' component={ AddPost } />
        <AnimatedRoute atEnter={{opacity:0}} atLeave={{ opacity: 0 }} atActive={{ opacity: 1 }} exact path='/' component={Home}/>
        <AnimatedRoute atEnter={{opacity:0}} atLeave={{ opacity: 1 }} atActive={{ opacity: 1 }} exact path='/map' component={AllPostsMap}/>          
      </Switch>

    </main>
  )
}
