import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Login from './Login'

export default function () {
  return (
    <Switch>
      <Route to='/login' component={ Login } />
    </Switch>
  )
}