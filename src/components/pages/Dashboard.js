import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import DashboardSideBar from './dashboardComponents/DashboardSideBar';
import Posts from './dashboardComponents/DashboardMyPosts';
import Storylines from './dashboardComponents/DashboardMyStorylines';
import AStoryline from './dashboardComponents/DashboardStoryline';
import MyLocations from './dashboardComponents/MyLocations'
import Profile from './Profile';

const Dashboard = () => {
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
        <DashboardSideBar />
      </div>

      <div className='dashboard-main-container'>
        <Switch>
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

export default Dashboard;

