import React, { Component } from 'react';

import GoogleTest from './googleTest';

export default class TestBed extends Component {
  constructor() {
    super();
    this.state = { term: '' };

    this.handleInput = this.handleInput.bind(this);
  }

  handleInput(term) {
    console.log('in TestBedGoogle, Google maps: ', term);
    this.setState({ term })
  }

  render() {
    
    return (
      <div>
        <h4>TestBedGoogle - google maps testing:</h4>
        <div className="well">
          <GoogleTest selection={ this.handleInput } />
        </div>
      </div>
    )
  }
}
