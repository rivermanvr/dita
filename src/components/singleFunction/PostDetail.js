import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PostCard } from './Posts';
import { recordMetrics } from '../../actions'

// update half life when visited
const PostDetail = (props) => {
  const { posts } = props;
  const postId = +props.match.params.id;

  if (postId) {
    props.recordMetrics(postId, { userId: +props.currentUser.user.id, type: 'VISIT' })
  }

  return (
    <div>
      <h4>Post Detail</h4>
      {
        posts.filter(post => {
          return post.id === postId
        }).map(post => <PostCard key={ post.id } content={ post } />)
      }      
    </div>
  )
}

const mapStateToProps = ({ currentUser, posts }) => {
  return {
    currentUser,
    posts
  }
}

export default connect(mapStateToProps, { recordMetrics })(PostDetail)