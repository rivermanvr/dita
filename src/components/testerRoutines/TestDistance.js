import React, { Component } from 'react';
import Textbox from '../reusables/Textbox'
import Button from '../reusables/Button'

import MapWithASearchBox from '../singleFunction/geoLocator';

export default class TestBed extends Component {
  state = { place: [], radius: 10, lat: 0, long: 0, testPlace: [] }

  handleInput = place => {
    // console.log('in TestBedGoogle, GeoLocate: ', place);
    this.setState({ testPlace: place })
  }

  handleChange = name => ev => {
    this.setState({ [name]: ev.target.value })
  }

  render = () => {
    const { radius, lat, long } = this.state
    const { handleChange } = this

    console.log(this.state)

    return (
      <div>
        <h3>Testing distance between two points</h3>
        <p>Will display True/False if location falls within x miles from location
          from geoloc component</p>

        <MapWithASearchBox selection={ this.handleInput } />

        <Textbox
          label='radius'
          value={ radius }
          type='number'
          onChange={ handleChange('radius') } />
        <Textbox
          label='lat'
          value={ lat }
          type='number'
          onChange={ handleChange('lat') } />
        <Textbox
          label='long'
          value={ long }
          type='number'
          onChange={ handleChange('long') } />
        <Button
          label='test' />
      </div>
    )
  }
}
