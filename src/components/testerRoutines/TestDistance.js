import React, { Component } from 'react';
import Textbox from '../reusables/Textbox'
import Button from '../reusables/Button'

import MapWithASearchBox from '../singleFunction/geoLocator';

export function calcDistance (lat1, lon1, lat2, lon2, unit) {
  // source: http://www.geodatasource.com/developers/javascript

  let radlat1 = Math.PI * lat1/180
  let radlat2 = Math.PI * lat2/180
  let theta = lon1-lon2
  let radtheta = Math.PI * theta/180
  let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  dist = Math.acos(dist)
  dist = dist * 180/Math.PI
  dist = dist * 60 * 1.1515
  if (unit=="K") { dist = dist * 1.609344 }
  if (unit=="N") { dist = dist * 0.8684 }

  return dist
}

export default class TestBed extends Component {
  state = { place: [], radius: 10, lat: 0, lng: 0, testLat: 0, testLng: 0, distance: 0 }

  handleInput = place => {
    // console.log('in TestBedGoogle, GeoLocate: ', place);
  }

  handleChange = name => ev => {
    this.setState({ [name]: ev.target.value })
  }

  handleSourceChange = place => {
    if (place.length) {
      this.setState({
        lat: place[0].geometry.location.lat(),
        lng: place[0].geometry.location.lng()
      })
    }
  }

  handleTestPlaceChange = place => {
    if (place.length) {
      this.setState({
        testLat: place[0].geometry.location.lat(),
        testLng: place[0].geometry.location.lng()
      })
    }
  }

  handleCalc = () => {
    const { lat, lng, testLat, testLng } = this.state
    this.setState({
      distance: calcDistance(lat, lng, testLat, testLng)
    })
  }

  render = () => {
    const { radius, lat, lng, distance } = this.state
    const { handleChange, handleSourceChange, handleTestPlaceChange, handleCalc } = this

    // console.log(this.state);

    return (
      <div>
        <h3>Testing distance between two points</h3>
        <p>Will display True/False if location falls within x miles from location
          from geoloc component</p>

        <h4>Source:</h4>
        <MapWithASearchBox selection={ this.handleInput } onChange={ handleSourceChange } />

        <h4>Test:</h4>
        <MapWithASearchBox selection={ this.handleInput } onChange={ handleTestPlaceChange } />

        <Textbox
          label='radius'
          value={ radius }
          type='number'
          onChange={ handleChange('radius') } />
        {/* <Textbox
          label='lat'
          value={ lat }
          type='number'
          onChange={ handleChange('lat') } />
        <Textbox
          label='lng'
          value={ lng }
          type='number'
          onChange={ handleChange('lng') } /> */}
        <Button
          onClick={ handleCalc }
          label='test' />

        <p>The distance is: <b>{ distance }</b></p>
        <p>Test in range of source: <b>{ distance < radius ? 'true' : 'false' }</b></p>
      </div>
    )
  }
}
