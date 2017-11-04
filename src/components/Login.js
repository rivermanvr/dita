import React, { Component } from 'react'
import { connect } from 'react-redux'

class Login extends Component {
  constructor() {
    super()
    this.state = { email: '', password: '' }
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChange(ev) {
    const { name, value } = ev.target
    this.setState({ [name]: value })
  }

  onSubmit(ev) {
    ev.preventDefault()
  }

  render() {
    const { email, password } = this.state
    const { onChange, onSubmit } = this

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

        <button className='btn btn-primary'>Login</button>
      </form>
    )
  }
}

export default Login