import React, { Component } from 'react'
import { connect } from 'react-redux'

// reusables
import { Textbox, Button } from '../reusables'

// material-ui
import TextField from 'material-ui/TextField'
import MatButton from 'material-ui/Button'

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
        <div className='login'>
          {/* <TextField
            id="query"
            label="Username or Email"
            value={ query }
            onChange={ handleChange('query') }
            margin="normal" /> 
          <TextField
            id="password"
            label="Password"
            type='password'
            value={ password }
            onChange={ handleChange('password') }
            margin="normal" />

          <br/>
          <MatButton raised style={{ backgroundColor: '#006DAA', color: 'white' }}>Log In</MatButton>
          <br/>
          <MatButton raised>Sign Up</MatButton>

          <div className='social-login'>
            <a href='/api/auth/google'>Google</a>
            <a href='/api/auth/facebook'>Facebook</a>
          </div> */}



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
            className='btn' />

          <div className='social-login'>
            <a href='/api/auth/google' className='btn'>Google</a>
            <a href='/api/auth/facebook' className='btn'>Facebook</a>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(null, { signIn })(Login)