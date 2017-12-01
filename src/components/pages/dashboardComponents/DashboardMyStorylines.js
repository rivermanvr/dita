import React from 'react'
import { connect } from 'react-redux'
import * as d3 from 'd3'
import { Link } from 'react-router-dom'


const Storylines = ({ storylines }) => {
  return (
    <div className='dashboard-item'>
      <h3 className='dashboard-header'>My Storylines</h3>

      <div className='post-cards-container'>
      { storylines && storylines.map(storyline => {
        let title = (storyline.title || storyline.description).slice(0, 30),
          totalHalflife = storyline.posts.reduce((total, post) => (total += post.halflife), 0),
          latestStory = storyline.posts[storyline.posts.length - 1],
          latestStoryTitle = (latestStory.title || latestStory.body).slice(0, 30),
          latestStoryBody = latestStory.body.slice(0, 200)


        return <div key={ storyline.id } className='post-card storyline-card'>
          <div className='post-card-header'>
            <h4>{ `${title}${title.length > 30 ? '...' : ''}` }</h4>
            <span className={ `trending-status hl-${Math.ceil(totalHalflife)}` }></span>
          </div>

          <div className='post-card-body'>
            <p>{ storyline.description }</p>
          </div>

          <div className='latest-story'>Latest story</div>
          <div onClick={ () => console.log('open modal') } className='storyline-card-latest-post-preview'>
            <label>{ latestStoryTitle }</label>
            <p>{ `${latestStoryBody}${latestStoryBody.length > 200 ? '...' : ''}` }</p>
            <span className='more'><i className='ion-ios-more-outline'></i></span>
          </div>

          <div className='post-card-footer'>
            <span>{ d3.timeFormat('%m/%d/%y')(new Date(storyline.updatedAt)) }</span>
            <span onClick={ () => console.log('open carousel') } className='more'><i className='ion-ios-more-outline'></i></span>
          </div>
        </div>
      })}
      </div>
    </div>
  )
}

const mapState = ({ userStorylines }) => ({ storylines: userStorylines })
export default connect(mapState)(Storylines)