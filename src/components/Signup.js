import React, { Component } from 'react'
import { connect } from 'react-redux'
import { signUp } from '../reducers'

import Textbox from './reusables/Textbox'
import Button from './reusables/Button'

class Signup extends Component {
  state = {
    username: '',
    email: '',
    password: '',
  }

  handleChange = name => ev => {
    this.setState({ [name]: ev.target.value })
  }

  onSubmit = () => {
    this.props.signUp(this.state)
      .then(() => this.props.history.push('/'))
  }

  render = () => {
    const {
      username,
      email,
      password,
      confirmpass } = this.state

    const {
      handleChange,
      onSubmit } = this

    return (
      <div>
        <Textbox 
          label='Username'
          value={ username }
          placeHolder='Please enter your username...'
          onChange={ handleChange('username') } />
        <Textbox 
          label='Email'
          value={ email }
          type='email'
          placeHolder='Please enter an email...'
          onChange={ handleChange('email') } />
        <Textbox 
          label='Password'
          value={ password }
          type='password'
          placeHolder='Please enter a password...'
          onChange={ handleChange('password') } />
        <Button
          onClick={ onSubmit }
          label='Sign Up!' />
      </div>
    )
  }
}

const mapDispatch = { signUp }
export default connect(null, mapDispatch)(Signup)