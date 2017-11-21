import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import { updateUser } from '../../reducers'
import { Button } from '../reusables'
import UserValues from './UserValues'

class Profile extends Component {
  state = {}

  componentDidMount = () => {
    this.setState({ user: this.props.user })
  } 

  componentWillReceiveProps = (nextProps) => {
    this.setState({ user: nextProps.user })
  }

  handleChange = newValues => {
    this.setState({ user: newValues })
  }

  handleUpdate = () => {
    // filters through non-empty fields
    // maintains immutability of the state
    const { user } = this.state
    const userData = Object.keys(user).reduce((data, k) => {
      return !_.isEmpty(user[k]) ? Object.assign(data, { [k]: user[k] }) : data
    }, {})

    this.props.updateUser(userData)
      .then(() => this.props.history.push('/'))
  }

  render = () => {
    const { handleChange, handleUpdate } = this
    const { isAuthenticated } = this.props
    const { user } = this.state 

    return (
      <div>
        <div className='form-group'>
          <UserValues
            user={ user }
            onChange={ handleChange } />
        </div>

        <Button
          onClick={ handleUpdate }
          disabled={ !isAuthenticated }
          className='btn btn-primary'
          label='Update Profile' />
      </div>
    )
  }
}

const mapState = ({ currentUser }) => ({
  user: currentUser.user,
  isAuthenticated: currentUser.isAuthenticated
})
const mapDispatch = { updateUser }
export default connect(mapState, mapDispatch)(Profile)