import React, { Component } from 'react';

import GeoLoc from './googleTest';

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
        <h4>TestBedGoogle - geoLocationInput testing:</h4>
        <div className="colWidth40">
          <GeoLoc selection={ this.handleInput } />
        </div>
      </div>
    )
  }
}
