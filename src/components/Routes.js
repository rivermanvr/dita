import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Navbar from '../containers/Navbar'
import TestBed from './singleFunction/TestBed';
import Login from './Login'

export default function () {
  return (
    <div>
      {/* render on all paths */}
      <Route render={ (router) => <Navbar router={ router } /> } />

      {/* render only on specific paths */}
      <Switch>
        <Route exact path='/login' component={ Login } />
        <Route exact path="/testBed" component={ TestBed } />
      </Switch>
    </div>
  )
}