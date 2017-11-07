import React, { Component } from 'react';

import MapWithASearchBox from '../singleFunction/geoLocator';

export default class TestBed extends Component {
  constructor() {
    super();
    this.state = { places: [] };

    this.handleInput = this.handleInput.bind(this);
  }

  handleInput(place) {
    console.log('in TestBedGoogle, GeoLocate: ', place);
  }

  render() {
    
    return (
      <div>
        <h4>TestBedGoogle - geoLocationInput testing:</h4>
        <div className="colWidth40">
          <MapWithASearchBox selection={ this.handleInput } />
        </div>
      </div>
    )
  }
}
