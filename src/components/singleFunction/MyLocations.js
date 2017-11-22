import React from 'react'
import { connect } from 'react-redux'

import { Button } from '../reusables'
import SearchAddLoc from './SearchAddLoc'
import PinnedLocation from './PinnedLocation'


const MyLocations = (props) => {
  return (
    <div>
      <h3>My Locations</h3> 

      <div>
        <h5>Home</h5>
        { props.home ?
          <b>{ props.home.address }</b> :
          <i>You haven't set a home yet! Add/set one below!</i> }
      </div>

      <SearchAddLoc />

      { props.pinnedLocations.map(location => (
        <PinnedLocation key={ location.id } location={ location } />
      ))}
    </div>
    )
}

const mapState = ({ userLocations }) => ({
  pinnedLocations: userLocations.pinnedLocations,
  home: userLocations.home
})

export default connect(mapState)(MyLocations)