import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import DashboardSideBar from './dashboardComponents/DashboardSideBar';
import AllPosts from '../singleFunction/AllPosts';
import Posts from '../singleFunction/Posts';
import MyLocations from '../singleFunction/MyLocations';
import Profile from './Profile';

const Dashboard = () => {
  return(
    <div>  
      <div>
        <div>
          <DashboardSideBar render={ DashboardSideBar }/> 
        </div>

        <div>
          <Route exact path='/dashboard/myposts' component={ Posts } />
          <Route exact path='/dashboard/mylocations' component={ MyLocations} />
          <Route exact path='/dashboard/profile' component={ Profile } />
        </div>
        
      </div>
    </div>
  )  

}

export default Dashboard;

