import React, { Component } from 'react'
import { connect } from 'react-redux'
import { signUp, updateUser } from '../../reducers'
import _ from 'lodash'

import Textbox from '../reusables/Textbox'
import Button from '../reusables/Button'

class Signup extends Component {
  state = {
    username: '',
    email: '',
    password: '',
  }

  componentDidMount = () => {
    if (this.props.currentUser.isAuthenticated) {
      this.setState(this.props.currentUser.user)
    }
  } 

  componentWillReceiveProps = (nextProps) => {
    // optimistic, doesn't redirect if you manually go to '/signup'
    // but signup is disabled if user is authenticated
    if (nextProps.currentUser.isAuthenticated) {
      this.setState(nextProps.currentUser.user)
    }
  }

  handleChange = name => ev => {
    this.setState({ [name]: ev.target.value })
  }

  onSignup = () => {
    this.props.signUp(this.state)
      .then(() => this.props.history.push('/'))
  }

  onUpdate = () => {
    // filters through non-empty fields
    // maintains immutability of the state
    const userData = Object.keys(this.state).reduce((data, k) => {
      return !_.isEmpty(this.state[k]) ? Object.assign(data, { [k]: this.state[k] }) : data
    }, {})

    this.props.updateUser(userData)
      .then(() => this.props.history.push('/'))
  }

  render = () => {
    const {
      username,
      email,
      password,
      confirmpass } = this.state

    const {
      currentUser,
      location } = this.props

    const {
      handleChange,
      onSignup,
      onUpdate } = this

    return (
      <div>
        <div className='form-group'>
          <Textbox 
            label='Username'
            value={ username }
            placeHolder='Please enter your username...'
            className='form-control'
            onChange={ handleChange('username') } />
          <Textbox 
            label='Email'
            value={ email }
            type='email'
            placeHolder='Please enter an email...'
            className='form-control'
            onChange={ handleChange('email') } />
          <Textbox 
            label='Password'
            value={ password }
            type='password'
            placeHolder='Please enter a password...'
            className='form-control'
            onChange={ handleChange('password') } />
        </div>

        { location.pathname == '/signup' ?
          <Button
            onClick={ onSignup }
            disabled={ currentUser.isAuthenticated }
            className='btn btn-primary'
            label='Sign Up!' /> :
          <Button
            onClick={ onUpdate }
            disabled={ !currentUser.isAuthenticated }
            className='btn btn-primary'
            label='Update Profile' /> }
      </div>
    )
  }
}

const mapState = ({ currentUser }) => ({ currentUser })
const mapDispatch = { signUp, updateUser }
export default connect(mapState, mapDispatch)(Signup)