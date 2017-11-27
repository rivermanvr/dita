import React, { Component } from 'react'
import { connect } from 'react-redux'

import MapWithASearchBox from '../singleFunction/geoLocator';
import { signUp } from '../../actions'
import { Button } from '../reusables'
import UserValues from './UserValues'
import verifyEmptyState from './verifyEmptyState'
import { handleAxiosErrors } from './handleErrors'

class Signup extends Component {
  state = {
    user: {
      username: '',
      name: '',
      password: '',
      email: ''
    },
    location: {
      address: '',
      lat: 0.0,
      lng: 0.0,
      isHome: true
    },
    hasError: '',
    isValid: false
    // brute forcing it
  }

  handleChange = newValues => {
    const nextUserState = { ...this.state.user, ...newValues }
    this.setState({
      user: nextUserState,
      isValid: verifyEmptyState(nextUserState) && verifyEmptyState(this.state.location)
    })
  }

  handlePlaceChange = place => {
    if (place) {
      const nextLocationState = {
        ...this.state.location,
        address: place.formatted_address,
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
        isHome: true
      }

      this.setState({
        location: nextLocationState,
        isValid: verifyEmptyState(nextLocationState) && verifyEmptyState(this.state.user)
      })
    }
  }

  handleSignup = () => {
    if (!verifyEmptyState(this.state.user) || !verifyEmptyState(this.state.location)) {
      // won't trigger since button is disabled
      return this.setState({ hasError: 'Required fields are missing' })
    } 

    this.props.signUp(this.state)
      .then(() => this.props.history.push('/dev'))
      .catch(err => this.setState({ hasError: handleAxiosErrors(err)[0] }))
  }

  handleRequired = inputs => {

  }

  render = () => {
    const { user, hasError, isValid } = this.state
    const { handleChange, handleSignup, handleRequired } = this

    return (
      <div>
        <div>
        { hasError && hasError }
        </div>
        <div className='form-group'>
          <UserValues
            handleRequired={ handleRequired }
            onChange={ handleChange } />

          <div>
            <h5>Set your home location</h5>
            <h6>Can be changed anytime</h6>
            <MapWithASearchBox selection={ this.handlePlaceChange } />
          </div>
        </div>

        <Button
          onClick={ handleSignup }
          disabled={ !isValid }
          className='btn btn-primary'
          label='Sign Up!' />
      </div>
    )
  }
}

export default connect(null, { signUp })(Signup)