import React, { Component } from 'react'
import { recordMetrics, setActivePost, setModal } from '../../actions'
import {connect} from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import Replies from './Replies'
import * as d3 from 'd3'

// update half life when visited
class PostDetail extends Component{
  constructor(props){
    super(props)
    this.state = {
      posts: [],
      currentPostIndex: null,
      currentPost: {}
    }
    this.handleNext = this.handleNext.bind(this)
    this.handlePrev = this.handlePrev.bind(this)
  }
  componentDidMount(){
    let currentPost = this.props.posts.find(post => post.id == this.props.activePost) 
    this.props.recordMetrics(currentPost.id, { userId: +this.props.userId, type: 'REPLY' })
    let storyPosts = this.props.posts.filter((post) => currentPost.storylineId === post.storylineId);
    let currentPostIndex
    if(storyPosts[0].storylineId == null) {
      storyPosts = null
      currentPostIndex = 0
    }
    else {
      currentPostIndex = storyPosts.indexOf(currentPost)
    }
    this.setState({
      post: this.props.posts.find(post => post.id == currentPost.id),
      posts: storyPosts,
      currentPostIndex: currentPostIndex,
      currentPost
    })
  }
  componentWillReceiveProps(newProps){
    /*console.log('newprops', newProps.post)
    const storyPosts = newProps.posts.filter((post) => newProps.post.storylineId === post.storylineId);
    const currentPostIndex = storyPosts.indexOf(newProps.post)
    this.setState({
      posts: storyPosts,
      currentPostIndex: currentPostIndex,
      currentPost: newProps.post
    })*/
  }
  handleUserDashboard = post => {
    this.props.history.push(`/userdashboard/${post.userId}/storylines`)
    this.props.setModal()
  }
  handleEditPost = post => {
    this.props.history.push(`/editpost/${post.id}`)
    this.props.setModal()
  }
  handleNext = () => {
    if(this.state.currentPostIndex === this.state.posts.length -1){
      this.setState({
        currentPost: this.state.posts[0],
        currentPostIndex: 0
      })
    }
    else {
      this.setState({
        currentPost: this.state.posts[this.state.currentPostIndex + 1],
        currentPostIndex: this.state.currentPostIndex + 1
      })
    }
  }
  handlePrev = () => {
    if(this.state.currentPostIndex === 0){
      this.setState({
        currentPost: this.state.posts[this.state.posts.length-1],
        currentPostIndex: this.state.posts.length -1
      })
    }
    else {
      this.setState({
        currentPost: this.state.posts[this.state.currentPostIndex - 1],
        currentPostIndex: this.state.currentPostIndex - 1
      })
    }
  }
  render(){
    const { userId } = this.props
    const {posts, currentPost, currentPostIndex} = this.state

    return (
      <div className="postDetail">
        {/*<span className={ `trending-status hl-${Math.ceil(currentPost && currentPost.halflife)}` }></span>*/}
        <h4 className="storyLineTitle">{currentPost.storyline && currentPost.storyline.title}</h4>
        <div className="fullPost">
          <div className="userInfo">
            <span className='profilePic' onClick={() => this.handleUserDashboard(currentPost)} style={{backgroundImage:`url(${currentPost.user && currentPost.user.profilePic})`}}></span>
            <h4 className="userName" onClick={() => this.handleUserDashboard(currentPost)}>{currentPost.user && currentPost.user.name}</h4>
          </div>
          <div className="postInfo">
            <h4 className="postTitle">{currentPost && currentPost.title} <small>on {d3.timeFormat('%m/%d')(new Date(currentPost && currentPost.createdAt))}</small></h4>
            <p className="postBody">{currentPost && currentPost.body}</p>
          </div>
          {
            currentPost.userId == userId ?
            <div className='edit-button'>
            {/* MURRAY THIS NEEDS TO BE STYLIZED */}
              <i className='ion-ios-compose-outline' onClick={ () => this.handleEditPost(currentPost) }></i>
            </div> : null
          }
          
        </div>
        <div className="divider">
          <i className="ion-ios-more-outline"></i>
          <i className="ion-ios-more-outline"></i>
        </div>
        <div className="postReplies">
          {currentPost && <Replies handleUserDashboard={this.handleUserDashboard} postId={currentPost && currentPost.id} />}
        </div>
          {posts && <div className="detailFooter"><i onClick={this.handlePrev} className="ion-android-arrow-back"></i>
          <p>{currentPostIndex + 1} of {posts && posts.length}</p>
          <i onClick={this.handleNext} className="ion-android-arrow-forward" ></i>
          </div>
          }
      </div>
    )
  }
}

const mapStateToProps = ({ currentUser, posts, activePost }) => {
  return {
    userId: currentUser.isAuthenticated && currentUser.user.id,
    posts,
    activePost
  }
}

export default withRouter(connect(mapStateToProps, { recordMetrics, setActivePost, setModal })(PostDetail))
