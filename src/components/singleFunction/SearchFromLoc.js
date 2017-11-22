import React, { Component } from 'react'
import SearchAddLoc from './SearchAddLoc'
import { Textbox, Button } from '../reusables'

export default class SearchFromLoc extends Component {
  // wrapper for MapWithASearchBox with radius
  state = { radius: 10, place: {} }

  selection = place => {
    this.setState({ place })
    this.props.handleSelection(place, this.state.radius)
  }

  handleSearch = () => {
    const { place, radius } = this.state
    this.props.handleSelection(place, radius)
  }

  handleChange = name => ev => {
    this.setState({ [name]: ev.target.value })
  }

  render = () => {
    const { handleChange, handleSearch, selection } = this

    return(
      <div>
        <SearchAddLoc selection={ selection } />
        <Textbox
          label='Radius'
          type='number'
          value={ this.state.radius }
          onChange={ handleChange('radius') } />
        <Button
          label='Search'
          onClick={ handleSearch } />
      </div>
    )
  }
}

