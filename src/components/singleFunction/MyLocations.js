import React, { Component } from 'react'
import { connect } from 'react-redux'
import { isEmpty } from 'lodash'
import { addUserLocation, removeUserLocation, setAsHome } from '../../store'

import { Button } from '../reusables'
import MapWithASearchBox from '../singleFunction/geoLocator';

const initialState = {
  address: '',
  latitude: '',
  longitude: ''
}

class MyLocations extends Component {
  state = initialState

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
      .then(() => this.setState(initialState))
  }

  render = () => {
    return (
      <div>
        <h3>My Locations</h3> 

        <div>
          <h5>Home</h5>
          { this.props.home ?
            <b>{ this.props.home.address }</b> :
            <i>You haven't set a home yet! Add/set one below!</i> }
        </div>

        <div>
          <h5>Add a new place</h5>
          <MapWithASearchBox selection={ this.handlePlaceChange } />
          <Button
            label={ <i className='icon ion-plus'></i> }
            disabled={ isEmpty(this.state.address) }
            onClick={ this.handleAdd }
            className='btn btn-primary' />
        </div>

        <div>
        { this.props.userLocations.map(location => (
          <div key={ location.id }>
            <h5>{ location.address }</h5>
            <Button
              label={ <i className='icon ion-minus'></i> }
              onClick={ () => this.props.removeUserLocation(location) }
              className='btn btn-primary' />
            { !location.isHome ?
            <Button
              label={ <i className='icon ion-home'></i> }
              onClick={ () => this.props.setAsHome(location) }
              className='btn btn-primary' /> : null }
          </div>
        )) }
        </div>

      </div>
    )
  }
}

const mapState = ({ userLocations }) => ({
  userLocations,
  home: userLocations.find(location => location.isHome)
})
const mapDispatch = { addUserLocation, removeUserLocation, setAsHome }
export default connect(mapState, mapDispatch)(MyLocations)