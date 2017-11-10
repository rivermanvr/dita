import React from 'react'
import { connect } from 'react-redux'
import * as d3 from 'd3'

export const PostCard = ({ content }) => {
  const {
    createdAt,
    title,
    body,
    storyline,
    replies
  } = content

  return (
    <div className="list-group-item">
      <h4 className="list-group-item-heading">
        { title }
        <small>from story <span style={{fontSize:'16px', textTransform:'capitalize'}}>{ storyline && storyline.title }</span></small>
      </h4>
      
      <p className="list-group-item-text">{ body }</p>
      <h5>Replies:</h5>
      {
        replies.map(reply => (
          <div key={reply.id}>
          <p style={{fontWeight:'bold', display:'inline-block'}}>{reply.user.name}:</p>
          <small className='list-group-item-text'> {reply.body}</small>
          </div>
        ))
      }
      <small>{ d3.timeFormat('%m/%d/%y')(new Date(createdAt)) }</small>
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