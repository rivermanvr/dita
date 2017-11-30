import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const DashboardSideBar = () => {
  const sidebarItems = [
    { label: 'My Posts', path: '/dashboard/myposts' },
    { label: 'My Locations', path: '/dashboard/mylocations' },
    { label: 'Profile', path: '/dashboard/profile' }
  ];

  return (
    <ul className='dashboard-sidebar'>
      {
        sidebarItems.map(sidebar => {
          return (
            <li key={ sidebar.label }>
              <Link to={ sidebar.path }>{ sidebar.label }</Link>  
            </li>          
          )
        })
      }
    </ul>
 
  )
}

export default DashboardSideBar;

