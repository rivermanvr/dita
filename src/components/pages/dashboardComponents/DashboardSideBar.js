import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

const DashboardSideBar = ({ sidebarItems, location }) => {
  const pathName = location.pathname

  return (
    <ul className='dashboard-sidebar'>
      {
        sidebarItems.map(sidebar => {
          return (
            <li key={ sidebar.label }>
              <Link to={ sidebar.path } className={ pathName.includes(sidebar.root) ? 'active' : '' }>{ sidebar.label }</Link>  
            </li>          
          )
        })
      }
    </ul>
  )
}

export default withRouter(DashboardSideBar);
