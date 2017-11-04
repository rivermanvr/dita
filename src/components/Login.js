import React, { Component } from 'react'
import { connect } from 'react-redux'
import { signIn, signOut } from '../reducers'

class Login extends Component {
  constructor() {
    super()
    this.state = { email: '', password: '' }
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.testSignOut = this.testSignOut.bind(this)
  }

  onChange(ev) {
    const { name, value } = ev.target
    this.setState({ [name]: value })
  }

  onSubmit(ev) {
    ev.preventDefault()
    this.props.signIn(this.state)
  }

  testSignOut(ev) {
    ev.preventDefault()
    this.props.signOut()
  }

  render() {
    const { email, password } = this.state
    const { onChange, onSubmit, testSignOut } = this

    return (
      <form onSubmit={ onSubmit }>
        <div className="form-group">
          <label htmlFor='email'>Email</label>
          <input name='email' type='email' value={ email } onChange={ onChange } className='form-control'/>
        </div>

        <div className="form-group">
          <label htmlFor='password'>Password</label>
          <input name='password' type='password' value={ password } onChange={ onChange } className='form-control'/>
        </div>

        { this.props.loggedIn ?
          <button className='btn btn-primary' onClick={ testSignOut }>Logout</button> :
          <button className='btn btn-primary'>Login</button> }
      </form>
    )
  }
}

const mapState = ({ currentUser }) => ({ loggedIn: currentUser.isAuthenticated })
const mapDispatch = { signIn, signOut }
export default connect(mapState, mapDispatch)(Login)