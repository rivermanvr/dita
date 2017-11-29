import React from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'

// components
import { Button } from './reusables'

// redux
import { signOut } from '../actions'

// to add nav items, add label and path here
const navItems = [
  { label: 'About', path: '/about' }
]

// add nav items only registered users can see
const navItemsAuthenticated = [
  { label: 'Add Post', path: '/addpost' },
  { label: 'Profile', path: '/profile' }
]

// add items for guests users
const navItemsGuests = [
  { label: 'Login', path: '/login' },
  { label: 'Sign Up', path: '/signup' },
]

const Nav = ({ isAuthenticated, location, logout }) => {
  // location sub-path will be parsed out, eg. /posts/1 will still highlight /posts label
  const pathName = '/' + location.pathname.split('/')[1]

  return (
    <nav>
      <div>
        <Link to='/'>dita</Link>
        <Link to='/dev' className='btn blue rounded inline'>DEV</Link>
      </div>

      <div>
      { navItems.map(item =>
        <Link
          className={ item.path == pathName ? 'active' : '' }
          to={ item.path }
          key={ item.label }>{ item.label }</Link>
      )}
      { isAuthenticated ?
        <span>
          { navItemsAuthenticated.map(item =>
          <Link
            className={ item.path == pathName ? 'active' : '' }
            to={ item.path }
            key={ item.label }>{ item.label }</Link>
          )}
          <a onClick={ logout }>Sign Out</a>
        </span> :
        <span>
          { navItemsGuests.map(item =>
          <Link
            className={ item.path == pathName ? 'active' : '' }
            to={ item.path }
            key={ item.label }>{ item.label }</Link>
          )}
        </span>
      }
      </div>
    </nav>
  )
}

const mapState = ({ currentUser }) => ({
  isAuthenticated: currentUser.isAuthenticated
})
const mapDispatch = (dispatch, ownProps) => ({
  logout() {
    dispatch(signOut())
    ownProps.history.push('/')
  }
})
export default withRouter(connect(mapState, mapDispatch)(Nav))