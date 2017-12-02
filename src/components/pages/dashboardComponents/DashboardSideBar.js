import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const DashboardSideBar = ({ sidebarItems }) => {
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
