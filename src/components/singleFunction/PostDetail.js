import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PostCard } from './Posts';

const PostDetail = (props) => {
  const { posts } = props;
  const postId = +props.match.params.id;

  return (
    <div>
      <h4>Post Detail</h4>
      {
        posts.posts.filter(post => {
          return post.id === postId
        }).map(post => <PostCard key={ post.id } content={ post } />)
      }      
    </div>
  )
}

const mapStateToProps = ({ posts }) => {
  return {
    posts
  }
}

export default connect(mapStateToProps)(PostDetail)