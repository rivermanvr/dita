import React from 'react'
import { connect } from 'react-redux'

import { Button } from '../../reusables'
import SearchAddLoc from '../../singleFunction/SearchAddLoc'
import PinnedLocation from '../../singleFunction/PinnedLocation'


const MyLocations = (props) => {
  return (
    <div className='my-locations dashboard-item'>
      <h3 className='dashboard-header'>My Locations</h3> 

      <div className='home-location'>
        <i className='ion-ios-home-outline'></i><span> { props.home.address }</span>
      </div>

      <div className='search-loc'>
        <SearchAddLoc />
      </div>

      <div className='locations-list'>
        <label>Your pinned locations</label>
        { props.pinnedLocations.map(location => (
          <PinnedLocation key={ location.id } location={ location } />
        ))}
      </div>
    </div>
    )
}

const mapState = ({ userLocations }) => ({
  pinnedLocations: userLocations.pinnedLocations,
  home: userLocations.home
})

export default connect(mapState)(MyLocations)