import React, { Component } from 'react'
import { Textbox } from '../reusables'

export default class UserValues extends Component {
  state = {
    name: '',
    username: '',
    email: '',
    password: ''
  }

  componentDidMount = () => {
    if (this.props.user) this.setState({ ...this.props.user })
  }

  componentWillReceiveProps = nextProps => {
    if (nextProps.user) this.setState({ ...nextProps.user })
  }

  handleChange = name => ev => {
    this.setState({ [name]: ev.target.value })
    this.props.onChange && this.props.onChange({ ...this.state, [name]: ev.target.value })
  }

  render = () => {
    return (
      <div>
        <Textbox
          label='Name'
          value={ this.state.name }
          required={ true }
          placeHolder='Please enter your name...'
          onChange={ this.handleChange('name') } />
        <Textbox
          label='Username'
          value={ this.state.username }
          required={ true }
          placeHolder='Please enter a username...'
          onChange={ this.handleChange('username') } />
        <Textbox
          label='Email'
          type='email'
          value={ this.state.email }
          required={ true }
          placeHolder='Please enter an email...'
          onChange={ this.handleChange('email') } />
        <Textbox
          label='Password'
          type='password'
          value={ this.state.password }
          required={ true }
          placeHolder='Please enter a password...'
          onChange={ this.handleChange('password') } />
      </div>
    )
  }
}