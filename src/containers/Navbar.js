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
      { title: 'LIVE', path: '/' },
      { title: 'Login - WZ', path: '/dev/login' },
      { title: 'Sign Up - WZ', path: '/dev/signup' },
      { title: 'My Posts - WZ', path: '/dev/myposts' },
      { title: 'View/Update Profile - WZ', path: '/dev/profile' },
      { title: 'TestBed - Vince', path: '/dev/testBed' },
      { title: 'GeoLocateInput(new) - Vince', path: '/dev/google' },
      { title: 'MoverControl - Vince', path: '/dev/testmover' },
      { title: 'View_StoriesPosts - Vince', path: '/dev/storiesView' },
      { title: 'All Posts By Loc - WZ', path: '/dev/allpostsbyloc' },
      { title: 'Create Story - WZ', path: '/dev/createstory' },
      { title: 'Add Post', path: '/dev/posts' },
      { title: 'All Posts', path: '/dev/allposts' },
      { title: 'Map', path: '/dev/allpostsmap' },
      { title: 'My Locations - WZ', path: '/dev/mylocations' },
      { title: 'Distance Test - WZ', path: '/dev/distancetest' }
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
