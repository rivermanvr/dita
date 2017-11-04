import React, { Component } from 'react'
import { connect } from 'react-redux'
import { signIn } from '../reducers'
import { signOut, getData } from '../reducers'

class Login extends Component {
  state = {
    query: '',
    password: ''
  }

  onChange = name => ev => {
    this.setState({ [name]: ev.target.value })
  }

  onSubmit = ev => {
    ev.preventDefault()
    this.props.signIn(this.state)
  }

  testSignOut = ev => {
    ev.preventDefault()
    this.props.signOut()
  }

  testGetData = ev => {
    ev.preventDefault()
    this.props.getData()
  }

  render() {
    const { query, password } = this.state
    const { onChange, onSubmit } = this
    const { testSignOut, testGetData } = this

    return (
      <form onSubmit={ onSubmit }>
        <div className="form-group">
          <label htmlFor='query'>Username or Email</label>
          <input value={ query } onChange={ onChange('query') } className='form-control'/>
        </div>

        <div className="form-group">
          <label htmlFor='password'>Password</label>
          <input type='password' value={ password } onChange={ onChange('password') } className='form-control'/>
        </div>

        { this.props.loggedIn ?
          <button className='btn btn-primary' onClick={ testSignOut }>Logout</button> :
          <button className='btn btn-primary'>Login</button> }
        <button className='btn btn-primary' onClick={ testGetData }>Get data</button>
      </form>
    )
  }
}

const mapState = ({ currentUser }) => ({ loggedIn: currentUser.isAuthenticated })
const mapDispatch = { signIn, signOut, getData }
export default connect(mapState, mapDispatch)(Login)