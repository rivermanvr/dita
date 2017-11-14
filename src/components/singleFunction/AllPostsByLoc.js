import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PostCard } from './Posts';
import MapWithASearchBox from './geoLocator';
import { setLocationFromGeoLoc, setRadius, calcDistance } from '../../actions'
import Textbox from '../reusables/Textbox'
import Button from '../reusables/Button'

export class SearchFromLoc extends Component {
  // wrapper for MapWithASearchBox with radius
  state = { radius: 10, place: {} }

  selection = place => {
    this.setState({ place })
    this.props.handleSelection(place, this.state.radius)
  }

  handleSearch = () => {
    const { place, radius } = this.state
    this.props.handleSelection(place, radius)
  }

  handleChange = name => ev => {
    this.setState({ [name]: ev.target.value })
  }

  render = () => {
    const { handleChange, handleSearch, selection } = this

    return(
      <div>
        <MapWithASearchBox selection={ selection }/>
        <Textbox
          label='Radius'
          type='number'
          value={ this.state.radius }
          onChange={ handleChange('radius') } />
        <Button
          label='Search'
          onClick={ handleSearch } />
      </div>
    )
  }
}

const AllPosts = ({ posts, setLocationFromGeoLoc }) => {
  return (
    <div>
      <h4>All posts</h4>

      <h5>Location</h5>
        <SearchFromLoc handleSelection={ setLocationFromGeoLoc } />
      <hr/>

      { posts.map(post => <PostCard key={ post.id } content={ post } />) }           
    </div>
  )  
}

const mapStateToProps = ({ posts, currentView }) => {
  // filter by currentView + radius
  const { lat, lng } = currentView

  return {
    posts: posts.filter(post => calcDistance(lat, lng, post.latitude, post.longitude) < currentView.radius)
  }
}

const mapDispatchToProps = { setLocationFromGeoLoc }

export default connect(mapStateToProps, mapDispatchToProps)(AllPosts);
