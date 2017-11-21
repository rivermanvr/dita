import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addUserLocation, removeUserLocation } from '../../store'

import { Button } from '../reusables'
import MapWithASearchBox from '../singleFunction/geoLocator';

class MyLocations extends Component {
  state = {
    address: '',
    latitude: '',
    longitude: ''   
  }

  handlePlaceChange = place => {
    if (place) {
      this.setState({
        address: place.formatted_address,
        latitude: place.geometry.location.lat(),
        longitude: place.geometry.location.lng()
      })
    }
  }

  handleAdd = () => {
    this.props.addUserLocation(this.state)
      .then(() => this.setState({
        address: '',
        latitude: '',
        longitude: ''
      }))
  }

  render = () => {
    return (
      <div>
        <h3>My Locations</h3> 

        <div>
          <h5>Add a new place</h5>
          <MapWithASearchBox selection={ this.handlePlaceChange } />
          <Button
            label='Add'
            onClick={ this.handleAdd } />
        </div>

        <div>
        { this.props.userLocations.map(location => (
          <div key={ location.id }>
            <h5>{ location.address }</h5>
            <Button
              label='Remove'
              onClick={ () => this.props.removeUserLocation(location) } />
          </div>
        )) }
        </div>

      </div>
    )
  }
}

const mapState = ({ userLocations }) => ({ userLocations })
const mapDispatch = { addUserLocation, removeUserLocation }
export default connect(mapState, mapDispatch)(MyLocations)