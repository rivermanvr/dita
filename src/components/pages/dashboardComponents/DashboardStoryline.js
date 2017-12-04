import React from 'react'
import { connect } from 'react-redux'
import * as d3 from 'd3'
import { Link } from 'react-router-dom'

// components
import { Posts } from './DashboardMyPosts'


export const Storyline = ({ storyline, back }) => {
  if (!storyline) return <div></div>

  return (
    <div className='dashboard-item'>
      <h3 className='dashboard-header'>
        <span className='dashboard-header-return-container' onClick={ back }>
          <i className='ion-ios-arrow-thin-left'></i>
          <span>Return to storylines</span>
        </span>
        <span>{ storyline.title }</span>
      </h3>

      <Posts posts={ storyline.posts } />
    </div>
  )
}

const mapState = ({ storylines, userStorylines }, ownProps) => {
  let rootStorylines = ownProps.match.params.userId ? storylines : userStorylines
  return {
    storyline: rootStorylines.find(storyline => storyline.id == ownProps.match.params.id)
  }
}
const mapDispatch = ({}, ownProps) => dispatch => ({
  back() {
    ownProps.history.goBack()
  }
})
export default connect(mapState, mapDispatch)(Storyline)