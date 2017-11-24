import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as d3 from 'd3'
import PostReply from './postReply'

const Replies = ({replies, currentUser,post}) => {
    return (
        <div className='replyContainer'>
        {
            replies.map((reply) => (
                <div className="singleReply">
                    <div className='userInfo'>
                        <span style={{backgroundImage:`url(${reply.user.profilePic})`}} className="userProfilePic"></span>
                        <p className={`userName ${currentUser.user.id === reply.user.id ? 'signedIn' : ''}`}>{reply.user.name}</p>
                        <small className='timePosted'>{d3.timeFormat('%I:%M% %p')(new Date(reply.createdAt))}</small>
                    </div>
                    <div className={`replyBody ${currentUser.user.id === reply.user.id ? 'signedIn' : ''}`}>
                        <p>{reply.body}</p>
                    </div>
                </div>
            ))
        }
        <PostReply post={post} />
        </div>
    )
}

const mapStateToProps = ({posts,currentUser}, props) => {
    return {
        replies: posts.find((post) => post.id === props.postId).replies,
        post:posts.find((post) => post.id === props.postId),
        currentUser,
    }
}

export default connect(mapStateToProps)(Replies)