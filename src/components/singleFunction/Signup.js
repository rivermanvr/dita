import React, { Component } from 'react'
import { connect } from 'react-redux'

import { signUp } from '../../reducers'
import { Button } from '../reusables'
import UserValues from './UserValues'

class Signup extends Component {
  state = {
    user: {
      name: '',
      username: '',
      email: '',
      password: '',
    }
  }

  handleChange = newValues => {
    this.setState({ user: newValues })
  }

  onSignup = () => {
    this.props.signUp(this.state.user)
      .then(() => this.props.history.push('/'))
  }

  render = () => {
    const { user } = this.state
    const { handleChange, onSignup } = this

    return (
      <div>
        <div className='form-group'>
          <UserValues
            user={ user }
            onChange={ handleChange } />
        </div>

        <Button
          onClick={ onSignup }
          className='btn btn-primary'
          label='Sign Up!' /> :
      </div>
    )
  }
}

const mapDispatch = { signUp }
export default connect(null, mapDispatch)(Signup)