import React from 'react'
import { connect } from 'react-redux'
import { Storylines } from './DashboardMyStorylines'

const UserStorylines = ({ storylines }) => {
  return (
    <div className='dashboard-item'>
      <h3 className='dashboard-header'>User Storylines</h3>

      <Storylines storylines={ storylines } />
    </div>
  )
}

const mapState = ({ storylines }, ownProps) => {
  console.log(ownProps)
  return { storylines: storylines.filter(storyline => ownProps.match.params.userId == storyline.userId) }
}
export default connect(mapState)(UserStorylines)