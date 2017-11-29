import React, { Component } from 'react'
import { connect } from 'react-redux'

// components
import { Textbox, Textarea, Button } from '../reusables'

// redux
import { addUserPost, createStoryAndPost } from '../../actions'

class AddPost extends Component {
  state = {
    title: '',
    body: '',
    addToStoryline: false,
    storyTitle: '',
    storyDescription: '',
    storylineId: 0
  }

  handleChange = name => ev => {
    this.setState({ [name]: ev.target.value })
  }

  toggleStoryline = () => {
    this.setState({ addToStoryline: !this.state.addToStoryline })
  }

  handlePost = () => {
    this.props.addPost(this.state)  
  }

  render = () => {
    const { title, body, addToStoryline, storyTitle, storyDescription } = this.state
    const { handleChange, handlePost, toggleStoryline } = this

    return (
      <div className='add-post'>
        <div className='add-post-inputs'>
          <Textbox
            placeHolder='Title (optional)'
            value={ title }
            className='title'
            onChange={ handleChange('title') } />
          <Textarea
            rows='30'
            placeHolder='Click or tap to write...'
            value={ body }
            onChange={ handleChange('body')} />
          <Textbox
            label='Location'
            disabled={ true }
            value={ this.props.home.address } />

          <Button
            label={ !addToStoryline ? 'Add to Storyline' : 'Cancel Adding' }
            onClick={ toggleStoryline }
            className='btn default' /> 
        </div>

        <div className={ `add-storyline-inputs ${ addToStoryline ? 'visible' : '' }` }>
          <div className='select'>
            <select onChange={ handleChange('storylineId') }>
              <option value={ 0 }>Please select a storyline...</option>
              { this.props.userStorylines.map(storyline => <option key={ storyline.id } value={ storyline.id }>{ storyline.title }</option>) }
            </select>
          </div>

          <label>Or create a storyline</label>
          <Textbox
            placeHolder='Story title (optional)'
            value={ storyTitle }
            onChange={ handleChange('storyTitle') } />
          <Textarea
            rows='5'
            placeHolder='Storyline description (optional)'
            value={ storyDescription }
            onChange={ handleChange('storyDescription') } />
        </div>

        <div className={ `add-post-button-container ${ addToStoryline ? 'slide-down' : '' }` }>
          <Button
            label={ addToStoryline ? 'Post and Share' : 'Add Private Post' }
            onClick={ handlePost }
            className='btn default' />
        </div>
      </div>
    )
  }
}

const mapState = ({ userLocations, userStorylines }) => ({
  home: userLocations.home,
  userStorylines
})
const mapDispatch = (dispatch, ownProps) => ({
  addPost(post) {
    post.storylineId = 1*post.storylineId || null
    // if addStoryline: true
    // if storylineId, omit storyTitle and storyDescription
    // else createStoryAndPost
    const { storyTitle, storyDescription, title, body } = post
    if (post.addToStoryline && !post.storylineId) {
      dispatch(createStoryAndPost(
        { title: post.storyTitle, description: post.storyDescription },
        { title, body }
      ))
      .then(() => {
        // placeholder
        ownProps.history.push('/map')
      })
    } else {
      // private post
      dispatch(addUserPost(post))
      .then(() => {
        // placeholder
        ownProps.history.push('/dashboard')
      })
    }
  }
})
export default connect(mapState, mapDispatch)(AddPost)