import React from 'react'
import { connect } from 'react-redux'
import { Posts } from './DashboardMyPosts'

const UserPosts = ({ posts }) => {
  return (
    <div className='dashboard-item'>
      <h3 className='dashboard-header'>User Posts</h3>

      <Posts posts={ posts } />
    </div>
  )
}

const mapState = ({ posts }, ownProps) => {
  return { posts: posts.filter(post => ownProps.match.params.userId == post.userId) }
}
export default connect(mapState)(UserPosts)