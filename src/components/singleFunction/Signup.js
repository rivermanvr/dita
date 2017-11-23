import React, { Component } from 'react'
import { connect } from 'react-redux'
import { isEmpty } from 'lodash'

import MapWithASearchBox from '../singleFunction/geoLocator';
import { signUp, addUserLocation } from '../../reducers'
import { Button } from '../reusables'
import UserValues from './UserValues'

class Signup extends Component {
  state = {
    user: {},
    location: {
      isHome: true
    }
  }

  handleChange = newValues => {
    this.setState({ user: newValues })
  }

  handlePlaceChange = place => {
    if (place) {
      this.setState({
        location: {
          ...this.state.location,
          address: place.formatted_address,
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        }
      })
    }
  }

  onSignup = () => {
    this.props.signUp(this.state.user)
      .then(() => {
        if (isEmpty(this.state.location.address)) return
        return this.props.addUserLocation(this.state.location)
      })
      .then(() => this.props.history.push('/'))
  }

  handleRequired = inputs => {

  }

  render = () => {
    const { user } = this.state
    const { handleChange, onSignup, handleRequired } = this

    return (
      <div>
        <div className='form-group'>
          <UserValues
            handleRequired={ handleRequired }
            user={ user }
            onChange={ handleChange } />

          <div>
            <h5>Set your home location</h5>
            <h6>Can be changed anytime</h6>
            <MapWithASearchBox selection={ this.handlePlaceChange } />
          </div>
        </div>

        <Button
          onClick={ onSignup }
          className='btn btn-primary'
          label='Sign Up!' /> :
      </div>
    )
  }
}

const mapDispatch = { signUp, addUserLocation }
export default connect(null, mapDispatch)(Signup)