import React, { Component } from 'react';

import MoverControl from '../singleFunction/moverControl';

export default class TestMover extends Component {
  constructor() {
    super();
    this.state = { moverTitle: '-Mover-'};

    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(arr) {
    console.log('in TestMover: ', arr[0], arr[1]);
  }

  render() {
    return (
      <div>
        <h4>TestMover:</h4>
        <div className="well">
          <h5>Homegrown carousel mover component</h5>
          <ul>
            <li>This is a carousel bar: first    previous    next    last</li>
            <li>name = 'SL', title = 'Storylines' data = userStorylines</li>
            <li>name = 'SLP', title = 'Posts' data = userPosts filtered</li>
            <li>name = 'UP', title = 'Posts' data = allPosts filtered</li>
            <li>return prop = this.props.selection</li>
          </ul>
          <MoverControl title={ this.state.moverTitle } name={ 'SL' } selection={ this.handleSelect } />
        </div>
      </div>
    )
  }
}
