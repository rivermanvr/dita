import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

// components
import { Textbox, Button } from '../reusables'

// redux
import { signIn } from '../../reducers'


class Login extends Component {
  state = { query: '', password: '' }

  handleChange = name => ev => {
    this.setState({ [name]: ev.target.value })
  }

  onSubmit = () => {
    this.props.signIn(this.state)
      .then(() => this.props.history.push('/'))
  }

  render = () => {
    const { query, password } = this.state
    const { handleChange, onSubmit } = this

    return (
      <div className='login-container'>
        <div className='form login'>
          <Textbox
            value={ query }
            onChange={ handleChange('query') }
            placeHolder='Username or Email'
            className='' />
          <Textbox
            type='password'
            value={ password }
            onChange={ handleChange('password') }
            placeHolder='Password'
            className='' />

          <Button
            label='Login'
            onClick={ onSubmit }
            className='btn default' />

          <Link to='/signup' className='btn default'>Sign Up!</Link>

          <hr/>
          <div className='social-login'>
            <a href='/api/auth/google' className='btn google'>Google</a>
            <a href='/api/auth/facebook' className='btn facebook'>Facebook</a>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(null, { signIn })(Login)