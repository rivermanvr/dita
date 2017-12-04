import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as d3 from 'd3'
import { Link } from 'react-router-dom'

// components
import PostDetail from '../../singleFunction/PostDetail'
import Modal from '../../reusables/Modal'

// redux
import { setActivePost, setModal } from '../../../actions'

export const _Posts = ({ posts, modal, toggleModal }) => {
  return (
    <div className='post-cards-container'>
    { posts && posts.map(post => {
      let title = (post.title || post.body).slice(0, 26),
        body = post.body.slice(0, 500)

      return <div key={ post.id } className='post-card'>
        <div className='post-card-header'>
          <h4>{ `${title.trim()}${title.length >= 26 ? '...' : ''}` }</h4>
          <span className={ `trending-status hl-${Math.ceil(post.halflife)}` }></span>
        </div>

        <div className='post-card-body'>
          <p>{ `${body}${body.length > 500 ? '...' : ''}` }</p>
        </div>

        <div className='post-card-footer'>
          <span>{ d3.timeFormat('%m/%d/%y')(new Date(post.createdAt)) }</span>
          <span onClick={ () => toggleModal(post) } className='replies-count-container'><i className='ion-ios-chatboxes-outline'></i> <span className='replies-count'>{ post.replies.length }</span></span>
          <span onClick={ () => toggleModal(post) } className='more'><i className='ion-ios-more-outline'></i></span>
        </div>
      </div>
    })}
    { modal && <Modal isActive={ modal }><PostDetail /></Modal> }
    </div>
  )
}

export class MyPosts extends Component {
  state = {
    toggleState: 0,
    viewStates: [ 'All', 'Shared', 'Private' ]
  }
  handleToggle = () => {
    const { toggleState, viewStates } = this.state
    let newToggleState = toggleState + 1 > viewStates.length - 1 ? 0 : toggleState + 1
    this.setState({ toggleState: newToggleState })
  }

  render = () => {
    const toView = this.state.viewStates[this.state.toggleState]
    const { posts } = this.props
    let postsToRender = toView == 'All' ? posts : toView == 'Shared' ? posts.filter(post => post.storylineId) : posts.filter(post => !post.storylineId)

    return (
      <div className='dashboard-item my-posts'>
        <div className='dashboard-header'>
          <h3>My Posts</h3>
          <div className='switch' onClick={ this.handleToggle }>
            <div className='toggle'>{ toView }</div>
          </div>
        </div>

        <Posts posts={ postsToRender } />
      </div>
    )
  }
}

const mapState = ({ userPosts }) => ({ posts: userPosts })
const mapPostState = ({ modal }) => ({ modal })
const mapPostDispatch = dispatch => ({
  toggleModal(post) {
    dispatch(setModal())
    dispatch(setActivePost(post))
  }
})
export const Posts = connect(mapPostState, mapPostDispatch)(_Posts)
export default connect(mapState)(MyPosts)
