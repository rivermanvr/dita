import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Router from './Router'

export default class App extends Component {
  render() {
    return (
      <div>
        <Router />
      </div>
    )
  }
}