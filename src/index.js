import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Dev from './components/Dev';
import App from './components/App';

ReactDOM.render(
  <Provider store={ store }>
    <Router>
      <Switch>
        <Route path='/dev' component={ Dev } />
        <Route path='/' component={ App } />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root'));
