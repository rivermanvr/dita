import React from 'react'
import { connect } from 'react-redux'

import { removeUserLocation, setAsHome } from '../../store'
import { Button } from '../reusables'

const PinnedLocation = (props) => {
  return (
    <div>
      <h5>{ props.location.address }{ props.location.isHome ? ' (home)' : '' }</h5>
      { !props.location.isHome ?
      <div>
        <Button
          label={ <i className='icon ion-minus'></i> }
          onClick={ () => props.unpinLocation(props.location) }
          className='btn btn-primary' />
        <Button
          label={ <i className='icon ion-home'></i> }
          onClick={ () => props.setAsHome(props.location) }
          className='btn btn-primary' />
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