import React, { Component } from 'react';
import { connect } from 'react-redux';
import GeoLoc from '/assets/design/geoMapDisplay';


const AllPostsMap = (props) => {
  return (
    <div>
      <h4>Map</h4>

    </div>

  )
}

const mapStateToProps = ({ posts }) => {
  return {
    posts
  }
}

export default connect (mapStateToProps)(AllPostsMap)