import React from 'react'
import { connect } from 'react-redux'
import * as d3 from 'd3'
import { Link } from 'react-router-dom'

// components
import PostDetail from '../../singleFunction/PostDetail'
import Modal from '../../reusables/Modal'

// redux
import { setActivePost, setModal } from '../../../actions'

export const _Storylines = ({ storylines, storyPath, modal, toggleModal }) => {
  return (
    <div className='post-cards-container'>
    { storylines && storylines.map(storyline => {
      let title = (storyline.title || storyline.description).slice(0, 26),
        description = (storyline.description || '').slice(0, 100),
        totalHalflife = storyline.posts.reduce((total, post) => (total += post.halflife), 0),
        latestPost = storyline.posts[storyline.posts.length - 1] || { title: '', body: '' }, // need to remove this conditional, shared posts should be in stories
        latestStoryTitle = (latestPost.title || latestPost.body).slice(0, 26),
        latestStoryBody = latestPost.body.slice(0, 100)


      return <div key={ storyline.id } className='post-card storyline-card'>
        <div className='post-card-header'>
          <h4>{ `${title}${title.length >= 26 ? '...' : ''}` }</h4>
          <span className={ `trending-status hl-${Math.ceil(totalHalflife/storyline.posts.length)}` }></span>
        </div>

        <div className='post-card-body'>
          <p>{ `${description}${description.length >= 100 ? '...' : ''}` }</p>
        </div>

        <div className='latest-story'>Latest post</div>
        <div onClick={ () => toggleModal(latestPost) } className='storyline-card-latest-post-preview'>
          <label>{ latestStoryTitle }</label>
          <p>{ `${latestStoryBody}${latestStoryBody.length >= 100 ? '...' : ''}` }</p>
          <span className='more'><i className='ion-ios-more-outline'></i></span>
        </div>

        <div className='post-card-footer'>
          <span>{ d3.timeFormat('%m/%d/%y')(new Date(storyline.updatedAt)) }</span>
          <Link to={ `${storyPath}/${storyline.id}` } className='more'><i className='ion-ios-more-outline'></i></Link>
        </div>
      </div>
    })}
    { modal && <Modal isActive={ modal }><PostDetail /></Modal> }
    </div>
  )
}

export const MyStorylines = ({ storylines }) => {
  return (
    <div className='dashboard-item'>
      <h3 className='dashboard-header'>My Storylines</h3>

      <Storylines storylines={ storylines } storyPath='/dashboard/mystorylines' />
    </div>
  )
}

const mapState = ({ userStorylines }) => ({ storylines: userStorylines })
const mapStorylinesState = ({ modal }) => ({ modal })
const mapStorylinesDispatch = dispatch => ({
  toggleModal(post) {
    dispatch(setModal())
    dispatch(setActivePost(post))
  }
})
export const Storylines = connect(mapStorylinesState, mapStorylinesDispatch)(_Storylines)
export default connect(mapState)(MyStorylines)
