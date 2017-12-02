import React from 'react'
import { connect } from 'react-redux'
import * as d3 from 'd3'
import { Link } from 'react-router-dom'

// components
import { Posts } from './DashboardMyPosts'


const Storyline = ({ storyline }) => {
  if (!storyline) return <div></div>

  return (
    <div className='dashboard-item'>
      <h3 className='dashboard-header'>{ storyline.title }</h3>

      <Posts posts={ storyline.posts } />
    </div>
  )
}

const mapState = ({ userStorylines }, ownProps) => ({ storyline: userStorylines.find(storyline => storyline.id == ownProps.match.params.id) })
export default connect(mapState)(Storyline)