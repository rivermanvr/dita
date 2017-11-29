import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import DashboardSideBar from './dashboardComponents/DashboardSideBar';
import AllPosts from '../singleFunction/AllPosts';
import PostForm from '../singleFunction/PostForm';
import Posts from '../singleFunction/Posts';
import MyLocations from '../singleFunction/MyLocations';

const Dashboard = () => {
  return(
    <div className="container">  
      <div className="row">
        <div className="col-md-3">
          <DashboardSideBar render={ DashboardSideBar }/> 
        </div>
        
      </div>
    </div>
  )  

}

export default Dashboard;

