import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

// components
import { Button } from '../reusables'
import MapWithASearchBox from '../singleFunction/geoLocator';
import UserValues from '../singleFunction/UserValues'
import verifyEmptyState from '../singleFunction/verifyEmptyState'
import { handleAxiosErrors } from '../singleFunction/handleErrors'

// redux
import { signUp } from '../../actions'

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
      .then(() => this.props.history.push('/'))
      .catch(err => this.setState({ hasError: handleAxiosErrors(err)[0] }))
  }

  handleRequired = inputs => {

  }

  render = () => {
    const { user, hasError, isValid } = this.state
    const { handleChange, handleSignup, handleRequired } = this

    return (
      <div className='login-container'>
        <div className='form'>
          <div>
          { hasError && hasError }
          </div>

          <UserValues
            handleRequired={ handleRequired }
            onChange={ handleChange } />

          <h5>Set your home location (can be changed anytime)</h5>
          <MapWithASearchBox selection={ this.handlePlaceChange } />

          <br/>
          <Button
            onClick={ handleSignup }
            disabled={ !isValid }
            className={ `btn ${!isValid ? 'disabled' : 'blue'}` }
            label='Sign Up!' />
        </div>
      </div>
    )
  }
}

export default connect(null, { signUp })(Signup)