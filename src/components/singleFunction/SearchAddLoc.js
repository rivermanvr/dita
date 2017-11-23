import React, { Component } from 'react'
import { connect } from 'react-redux'
import { isEmpty } from 'lodash'

import MapWithASearchBox from './geoLocator';
import { addUserLocation } from '../../store'
import { Button } from '../reusables'

class SearchAddLoc extends Component {
  // wrapper for MapWithASearchBox with pinned location
  initialState = {
    address: '',
    lat: '',
    lng: ''
  }

  state = this.initialState

  handlePlaceChange = place => {
    if (place) {
      this.setState({
        address: place.formatted_address,
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
      })
    }
    this.props.selection && this.props.selection(place)
  }

  handleAddClick = () => {
    this.props.addUserLocation(this.state)
    this.setState(this.initialState)
  }

  render = () => {
    return (
      <div>
        <h5>Add a new place</h5>
        <MapWithASearchBox selection={ this.handlePlaceChange } />
        <Button
          label={ <i className='icon ion-plus'></i> }
          disabled={ isEmpty(this.state.address) }
          onClick={ this.handleAddClick }
          className='btn btn-primary' />
      </div>
    )
  }
}

export default connect(null, { addUserLocation })(SearchAddLoc)
