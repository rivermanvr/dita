import React, { Component, Children, cloneElement } from 'react'

export default class Form extends Component {
  // component for wrapping form elements
  state = {
    required: [],
    isValid: true 
  }

  componentDidMount = () => {
    // console.log(this.props.children)
  }

  render = () => {
    const children = this.props.children
    return (
      <div className='dita-form'>
      {
        Children.map(children, child => {
          return cloneElement(child, {})
        })
      }
      </div>
    )
  }
}