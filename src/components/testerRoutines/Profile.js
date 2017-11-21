import React from 'react'
import { Button } from '../reusables'

import UserValues from '../singleFunction/UserValues'

export default class Profile extends React.Component {
  state = {}

  componentDidMount = () => {
    this.setState({
      username: 'test',
      email: 'testest@test.test',
      password: ''
    })
  }

  handleUserValChange = newValues => {
    this.setState({ ...newValues })
  }

  render = () => {
    const { username, email, password } = this.state
    const { handleUserValChange } = this

    // providing username, email, password from state isn't necessary
    // as long as the change is handled, it can update the local state

    return (
      <div>
        <h3>Sign up</h3>
          <UserValues
            username={ username }
            email={ email }
            password={ password }
            onChange={ handleUserValChange } />
        <Button
          label='Sign up' />
      </div>
    )
  }
}