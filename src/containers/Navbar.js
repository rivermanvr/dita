import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Tab = ({ tab, path }) => {
  return (
    <li className={ path === tab.path ? 'active' : null }>
      <Link to={ tab.path }>{ tab.title }</Link>
    </li>
  );
}

class Navbar extends Component {
  render() {
    const path = this.props.location.pathname;
    /* -------------------------------------------
      If you want to add a menu tab do the following:
      Add a tab within the array below (see the format below):
      Then add a corresponding Route in the Route.js Component
    ------------------------------------------- */
    const tabs = [
      { title: 'Login - WZ', path: '/login' },
      { title: 'Sign Up - WZ', path: '/signup' },
      { title: 'My Posts - WZ', path: '/myposts' },
      { title: 'View/Update Profile - WZ', path: '/profile' },
      { title: 'TestBed - Vince', path: '/testBed' },
      { title: 'GeoLocateInput(new) - Vince', path: '/google' },
      { title: 'View_StoriesPosts - Vince', path: '/storiesView' },
      { title: 'Add Post', path: '/posts' },
      { title: 'All Posts', path: '/allposts' },
      { title: 'Create Story - WZ', path: '/createstory' }
    ];
    return (
      <ul className="nav nav-tabs mainnav" style={ { marginBottom: '10px' } }>
        {
          tabs.map( tab => <Tab key={ tab.path } tab={ tab } path={ path } />)
        }
      </ul>
    );
  }
}

function mapStateToProps (state, { location }) {
  const { tests } = state;
  return { tests, location };
}

export default connect(mapStateToProps)(Navbar);
