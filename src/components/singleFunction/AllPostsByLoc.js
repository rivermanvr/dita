import React, { Component } from 'react';
import { connect } from 'react-redux';

import { setLocationFromGeoLoc, setLocationFromPin, setRadius, calcDistance } from '../../actions'
import { PostCard } from './Posts';
import { Button } from '../reusables'
import SearchFromLoc from './SearchFromLoc'
import injectComponent from './injectComponent'
import PinnedLocation from './PinnedLocation'


const SetLocationButton = props =>
  <Button
    label='Set location'
    onClick={ () => props.setLocation(props.location) } />

const SetPinnedLocation = injectComponent(SetLocationButton)(PinnedLocation)

const AllPosts = ({ posts, setLocationFromGeoLoc, setLocationFromPin, pinnedLocations }) => {
  return (
    <div>
      <h4>All posts</h4>

      <h5>Location</h5>
        <SearchFromLoc handleSelection={ setLocationFromGeoLoc } />
      <hr/>

      { pinnedLocations.map(location => (
        <SetPinnedLocation
          key={ location.id }
          location={ location }
          setLocation={ setLocationFromPin } />
      ))}

      { posts.map(post => <PostCard key={ post.id } content={ post } />) }           
    </div>
  )  
}

const mapStateToProps = ({ posts, currentView, userLocations }) => {
  // filter by currentView + radius
  const { lat, lng } = currentView

  return {
    pinnedLocations: userLocations.pinnedLocations,
    posts: posts.filter(post => calcDistance(lat, lng, post.latitude, post.longitude) < currentView.radius)
  }
}

const mapDispatchToProps = { setLocationFromGeoLoc, setLocationFromPin }
export default connect(mapStateToProps, mapDispatchToProps)(AllPosts);
