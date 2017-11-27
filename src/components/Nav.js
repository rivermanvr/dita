import React from 'react'
import { withRouter, Link } from 'react-router-dom'

// to add nav items, add label and path here
const navItems = [
  { label: 'Login', path: '/login' },
  { label: 'Sign Up', path: '/signup' },
  { label: 'Profile', path: '/profile' }
]

const Nav = ({ location }) => {
  // location sub-path will be parsed out, eg. /posts/1 will still highlight /posts label
  const pathName = '/' + location.pathname.split('/')[1]

  return (
    <nav>
    <Link to='/'>dita</Link>

      <div>
      { navItems.map(item =>
        <Link
          className={ item.path == pathName ? 'active' : '' }
          to={ item.path }
          key={ item.label }>{ item.label }</Link>
      )}
      </div>
    </nav>
  )
}

export default withRouter(Nav)