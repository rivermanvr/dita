import React from 'react';
import { Route, Switch } from 'react-router-dom';

import TestBed from './TestBed';
import Navbar from '../containers/NavBar';
import Tests from '../containers/Tests';
import Test from '../containers/Test';

export default function AppContainer() {
  return (
    <div className="container-fluid">
      <h3>Welcome to Dita</h3>
      <Route render={ (router) => <Navbar router={ router } /> } />
      <Switch>
      <Route
        path="/tests/:id" render={ (router) => <Test router={ router } /> }
      />
      <Route path="/testBed" component={ TestBed } />
      <Route path="/" component={ Tests } />
    </Switch>
    </div>
  )
}
