import React, { Component } from 'react'
import { connect } from 'react-redux'
import { isEmpty } from 'lodash'

import MapWithASearchBox from '../singleFunction/geoLocator';
import { signUp } from '../../actions'
import { Button } from '../reusables'
import UserValues from './UserValues'

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
    hasError: ''
    // brute forcing it
  }

  handleChange = newValues => {
    this.setState({ user: { ...newValues } })
  }

  handlePlaceChange = place => {
    if (place) {
      this.setState({
        location: {
          ...this.state.location,
          address: place.formatted_address,
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
          isHome: true
        }
      })
    }
  }

  handleSignup = () => {
    const { user, location } = this.state
    let isValid = Object.keys(user).reduce((bool, k) => {
      return bool && user[k]
    }, true)
    isValid = Object.keys(location).reduce((bool, k) => {
      return bool && location[k]
    }, isValid)

    if (!isValid) return this.setState({ hasError: 'Required fields are missing' })

    this.props.signUp(this.state)
      .then(() => this.props.history.push('/'))
  }

  handleRequired = inputs => {

  }

  render = () => {
    const { user, hasError } = this.state
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
          className='btn btn-primary'
          label='Sign Up!' />
      </div>
    )
  }
}

export default connect(null, { signUp })(Signup)