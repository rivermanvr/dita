import React from 'react'
import { connect } from 'react-redux'

import { removeUserLocation, setAsHome } from '../../store'
import { Button } from '../reusables'

const PinnedLocation = (props) => {
  return (
    <div className='pinned-location'>
      <span>{ props.location.address }{ props.location.isHome ? ' (home)' : '' }</span>
      { !props.location.isHome ?
      <div className='buttons'>
        <Button
          label={ <i className='ion-ios-home-outline'></i> }
          onClick={ () => props.setAsHome(props.location) }
          className='btn btn-primary inline' />
        <Button
          label={ <i className='ion-ios-minus-outline'></i> }
          onClick={ () => props.unpinLocation(props.location) }
          className='btn btn-primary inline' />
      </div> : null }
    </div>
  )
}

const mapDispatch = dispatch => ({
  unpinLocation(location) {
    dispatch(removeUserLocation(location))
  },
  setAsHome(location) {
    dispatch(setAsHome(location))
  }
})

export default connect(null, mapDispatch)(PinnedLocation)