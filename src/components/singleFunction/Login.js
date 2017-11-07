import React, { Component } from 'react'
import { connect } from 'react-redux'
import { signIn } from '../../reducers'
import { signOut, getData } from '../../reducers'
import Textbox from '../reusables/Textbox'
import Button from '../reusables/Button'

class Login extends Component {
  state = {
    query: '',
    password: ''
  }

  onChange = name => ev => {
    this.setState({ [name]: ev.target.value })
  }

  onSubmit = () => {
    // replace history.push with path to redirect
    this.props.signIn(this.state)
      .then(() => this.props.history.push('/'))
  }

  testSignOut = () => {
    // replace history.push with path to redirect
    this.props.signOut()
    this.props.history.push('/')
  }

  testGetData = () => {
    this.props.getData()
  }

  render = () => {
    const { query, password } = this.state
    const { onChange, onSubmit } = this
    const { testSignOut, testGetData } = this

    return (
      <div>
        <div className="form-group">
          <Textbox
            label='Username or Email'
            value={ query }
            onChange={ onChange('query') }
            className='form-control' />
          <Textbox
            label='Password'
            type='password'
            value={ password }
            onChange={ onChange('password') }
            className='form-control' />
        </div>

        { this.props.loggedIn ?
          <Button
            label='Logout'
            onClick={ testSignOut }
            className='btn btn-primary' /> :
           <Button
            label='Login'
            onClick={ onSubmit }
            className='btn btn-primary' /> }
        <Button
          label='Get data'
          onClick={ testGetData }
          className='btn btn-primary' />
      </div>
    )
  }
}

const mapState = ({ currentUser }) => ({ loggedIn: currentUser.isAuthenticated })
const mapDispatch = { signIn, signOut, getData }
export default connect(mapState, mapDispatch)(Login)