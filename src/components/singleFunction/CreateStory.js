import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import Select from 'react-select';
import Textbox from '../reusables/Textbox'
import Textarea from '../reusables/Textarea'
import Button from '../reusables/Button'
import { addStoryline } from '../../reducers'

class CreateStory extends Component {
  state = { title: '', description: '', selection: {} }

  onChange = name => ev => {
    this.setState({ [name]: ev.target.value })
  }

  onInputChange = option => {
    this.setState({ selection: option })
  }

  onClick = () => {
    this.props.addStoryline(this.state)
      .then(() => this.setState({ title: '', description: '', selection: {} }))
  }

  render() {
    const { postsAvailable } = this.props
    const { title, description, selection } = this.state
    const { onChange, onClick, onInputChange } = this

    return (
      <div>
        <div className='form-group'>
          <Textbox
            label='Story title (optional)'
            placeHolder='Please enter a title...'
            className='form-control'
            value={ title }
            onChange={ onChange('title') } />
          <Textarea
            label='Description (optional)'
            placeHolder='Please enter a description...'
            className='form-control'
            value={ description }
            onChange={ onChange('description') } />
          <Select
            name="form-field-select"
            className="Select"
            placeholder="make selection"
            value={ _.isEmpty(selection) ? '' : selection.value }
            options={ postsAvailable }
            onChange={ onInputChange } />
          </div>

        <Button
          label='Create Storyline & Share'
          disabled={ !this.props.currentUser.isAuthenticated || _.isEmpty(selection) }
          className='btn btn-primary'
          onClick={ onClick } />
      </div>
    )
  }
}

const mapState = ({ currentUser, userPosts }) => ({
  currentUser,
  postsAvailable: userPosts.filter(post => !post.storylineId).map(post => ({ value: post.id, label: post.title.length ? post.title : `${post.body.slice(0, 15)}...` }))
})

const mapDispatch = { addStoryline }

export default connect(mapState, mapDispatch)(CreateStory)