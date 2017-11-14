import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PostCard } from './Posts';

const AllPosts = ({ posts }) => {
  return (
    <div>
      <h4>All posts</h4>
      { posts.map(post => <PostCard key={ post.id } content={ post } />) }           
    </div>
  )  
}

const mapStateToProps = ({ posts }) => {
  return {
    posts
  }
}

export default connect(mapStateToProps)(AllPosts);

