import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PostCard } from './Posts';
import MapWithASearchBox from './geoLocator';
import { setLocationFromGeoLoc, setRadius } from '../../actions'

export class SearchFromLoc extends Component {
  // wrapper for MapWithASearchBox with radius
  state = { radius: 10 }

  selection = place => {
    // this.props.handleSelection
  }

  render = () => {
    return(
      <div>
        <MapWithASearchBox selection={ this.selection }/>
      </div>
    )
  }
}

const AllPosts = ({ posts, setLocationFromGeoLoc }) => {
  return (
    <div>
      <h4>All posts</h4>

      <h5>Location</h5>
        <SearchFromLoc onSelect={ setLocationFromGeoLoc } />
      <hr/>

      { posts.map(post => <PostCard key={ post.id } content={ post } />) }           
    </div>
  )  
}

const mapStateToProps = ({ posts, currentLocation }) => {
  return {
    posts
  }
}

const mapDispatchToProps = { setLocationFromGeoLoc }

export default connect(mapStateToProps, mapDispatchToProps)(AllPosts);
