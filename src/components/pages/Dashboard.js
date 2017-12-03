import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import DashboardSideBar from './dashboardComponents/DashboardSideBar';
import Posts from './dashboardComponents/DashboardMyPosts';
import Storylines from './dashboardComponents/DashboardMyStorylines';
import AStoryline from './dashboardComponents/DashboardStoryline';
import MyLocations from './dashboardComponents/MyLocations'
import UserStorylines from './dashboardComponents/DashboardUserStorylines'
import UserPosts from './dashboardComponents/DashboardUserPosts'
import Profile from './Profile';


const sidebarItems = [
  { label: 'My Storylines', path: '/dashboard/mystorylines' },
  { label: 'My Posts', path: '/dashboard/myposts' },
  { label: 'My Locations', path: '/dashboard/mylocations' },
  { label: 'Profile', path: '/dashboard/profile' }
]

const getUserSidebarItems = userId =>
  [
    { label: 'Storylines', path: `/userdashboard/${userId}/storylines` },
    { label: 'Posts', path: `/userdashboard/${userId}/posts` }
  ]

const Dashboard = ({ userId }) => {
  return(   
    <div className='dashboard'>
      <div className='dashboard-sidebar-container'>
        <div className='dashboard-label'>
          <i className='ion-ios-speedometer-outline'></i><span>Dashboard</span>
        </div>
        <div className='divider'>
          <i className='ion-ios-more-outline'></i>
          <i className='ion-ios-more-outline'></i>
        </div>
        <DashboardSideBar sidebarItems={ userId ? getUserSidebarItems(userId) : sidebarItems } />
      </div>

      <div className='dashboard-main-container'>
        <Switch>
          <Route exact path='/userdashboard/:userId/storylines' component={ UserStorylines } />
          <Route exact path='/userdashboard/:userId/storylines/:id' component={ AStoryline } />
          <Route exact path='/userdashboard/:userId/posts' component={ UserPosts } />
          <Route exact path='/dashboard/mylocations' component={ MyLocations } />
          <Route exact path='/dashboard/mystorylines' component={ Storylines } />
          <Route exact path='/dashboard/mystorylines/:id' component={ AStoryline } />
          <Route exact path='/dashboard/myposts' component={ Posts } />
          <Route exact path='/dashboard/profile' component={ Profile } /> 
        </Switch>
      </div>
    </div>
  )  
}

const mapDispatch = ({}, ownProps) => {
  let userId = ownProps.location.pathname.split('/')[2]
  userId = +userId

  return { userId: Number.isNaN(userId) ? null : userId }
}
export default connect(null, mapDispatch)(Dashboard)
