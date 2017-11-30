import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const DashboardSideBar = () => {
  const sidebarItems = [
    { label: 'Profile', path: '/dashboard/profile' },
    { label: 'My Posts', path: '/dashboard/myposts' }, 
    { label: 'My Locations', path: '/dashboard/mylocations' }    
  ];

  return (
    <ul>     
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

