import React, { Component } from 'react'

import Textbox from './reusables/Textbox'
import Button from './reusables/Button'

export default class Signup extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    confirmpass: '',
  }

  handleChange = name => ev => {
    this.setState({ [name]: ev.target.value })
  }

  onSubmit = () => {
    console.log('doing things')
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
      <form>
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
      </form>
    )
  }
}