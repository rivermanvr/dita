import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as d3 from 'd3'
import { withRouter } from 'react-router-dom'
import PostReply from './postReply'

const Replies = ({replies, currentUser,post, handleUserDashboard}) => {
  return (
    <div className='replyContainer'>
      <div className="replyGroup">
      {
        replies.map((reply) => (
          <div key={ reply.id } className="singleReply">
            <div className='userInfo'>
              <span onClick={() => handleUserDashboard(reply)} style={{backgroundImage:`url(${reply.user.profilePic})`}} className="userProfilePic"></span>
              <p onClick={() => handleUserDashboard(reply)} className={`userName ${post.user.id === reply.user.id ? 'myPost' : currentUser.user.id === reply.user.id ? 'signedIn' : ''}`}>{reply.user.name}</p>
            </div>
            <div className={`replyBody ${post.user.id === reply.user.id ? 'myPost' : currentUser.user.id === reply.user.id ? 'signedIn' : ''}`}>
              <small className='timePosted'>{d3.timeFormat('%m/%d')(new Date(reply.createdAt)) + ' at ' + d3.timeFormat('%I:%M% %p')(new Date(reply.createdAt))}</small>                            
              <p>{reply.body}</p>
            </div>
          </div>
        ))
      }
      </div>
      <PostReply post={post} />
    </div>
  )
}

const mapStateToProps = ({posts,currentUser}, props) => {
  return {
    replies: props.postId ? posts.find((post) => post.id === props.postId).replies.sort((a,b) => a.id - b.id) : [],
    post:posts.find((post) => post.id === props.postId),
    currentUser,
  }
}

export default withRouter(connect(mapStateToProps)(Replies))