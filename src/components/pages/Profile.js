import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

// components
import { Button } from '../reusables'
import UserValues from '../singleFunction/UserValues'
import verifyEmptyState from '../singleFunction/verifyEmptyState'

// redux
import { updateUser } from '../../actions'

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
    const { user } = this.state
    const userData = Object.keys(user).reduce((data, k) => {
      return !_.isEmpty(user[k]) ? Object.assign(data, { [k]: user[k] }) : data
    }, {})

    if (!verifyEmptyState(userData)) return 

    this.props.updateUser(userData)
      .then(() => this.props.history.push('/'))
  }

  render = () => {
    const { handleChange, handleUpdate } = this
    const { isAuthenticated } = this.props
    const { user } = this.state 

    return (
      <div className='login-container'>
        <div className='form'>
          <UserValues
            user={ user }
            onChange={ handleChange } />

          <Button
            onClick={ handleUpdate }
            disabled={ !isAuthenticated }
            className='btn default'
            label='Update Profile' />
        </div>
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