import React from 'react'
import { connect } from 'react-redux'

const PostCard = ({ content }) => {
  const {
    createdAt,
    title,
    body
  } = content

  return (
    <div className="list-group-item">
      <h4 className="list-group-item-heading">{ title }</h4>
      <p className="list-group-item-text">{ body }</p>
    </div>
  )
}

const Posts = ({ userPosts, pathname }) => {
  // blank for now, will do all posts otherwise
  const posts = pathname == '/myposts' ? userPosts : []

  return (
    <div>
      { pathname == '/myposts' ? <h4>My posts</h4> : <h4>Posts</h4> }

      { posts.map(post => <PostCard key={ post.id } content={ post } />) }
    </div>
  )
}

const mapState = ({ userPosts }, ownProps) => (
  { 
    userPosts,
    pathname: ownProps.location.pathname
  }
)

export default connect(mapState)(Posts)