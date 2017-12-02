import React from 'react'
import { connect } from 'react-redux'
import * as d3 from 'd3'
import { Link } from 'react-router-dom'

// components
import { Posts } from './DashboardMyPosts'


const Storyline = ({ storyline, back }) => {
  if (!storyline) return <div></div>

  return (
    <div className='dashboard-item'>
      <h3 className='dashboard-header'><i className='ion-ios-arrow-thin-left' onClick={ back }></i> <span>{ storyline.title }</span></h3>

      <Posts posts={ storyline.posts } />
    </div>
  )
}

const mapState = ({ userStorylines }, ownProps) => ({ storyline: userStorylines.find(storyline => storyline.id == ownProps.match.params.id) })
const mapDispatch = ({}, ownProps) => dispatch => ({
  back() {
    ownProps.history.goBack()
  }
})
export default connect(mapState, mapDispatch)(Storyline)