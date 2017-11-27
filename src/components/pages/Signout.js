import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

// redux
import { signOut } from '../../reducers'

export function Signout ({ signOut, history }) {
  console.log(signOut, history)

  return <div></div>
}

export default withRouter(connect(null, { signOut })(Signout))