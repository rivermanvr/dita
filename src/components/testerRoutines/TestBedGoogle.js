import React, { Component } from 'react';

import MapWithASearchBox from '../singleFunction/geoLocator';

export default class TestBed extends Component {
  constructor() {
    super();
    this.state = { place: [] };

    this.handleInput = this.handleInput.bind(this);
  }

  handleInput(place) {
    console.log('in TestBedGoogle, GeoLocate: ', place);
  }

  render() {
    return (
      <div>
        <h4>TestBedGoogle - geoLocationInput testing:</h4>
        <ul>
        <li>div wrap & render: geoLocator.js component</li>
        <li>Look at the TestBedGoogle.js component to see what is passed into this component</li>
        <li>Once a location is selected, the location is past to parent.</li>
        <li>Once a place is acquired, a redirect should occur (...unmounting the geoLocator component).</li>
        <li><hr /></li>
      </ul>
        <div className="colWidth40">
          <MapWithASearchBox selection={ this.handleInput } />
        </div>
      </div>
    )
  }
}
