import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const DashboardSideBar = () => {
  const sidebarItems = [
    { label: 'My Posts', path: '/dashboard/myposts' }, 
    { label: 'My Locations', path: '/dashboard/mylocations' },
    { label: 'Add Post', path: '/dashboard/addpost' }
  ];

  return (
    <ul className='list-group'>     
      {
        sidebarItems.map(sidebar => {
          return (
            <Link className='list-group-item' key={ sidebar.label }
              to={ sidebar.path }
            >{ sidebar.label }</Link>            
          )
        })
      }
    </ul>
 
  )
}

export default DashboardSideBar;

