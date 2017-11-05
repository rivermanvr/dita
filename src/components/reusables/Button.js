import React, { Component } from 'react'

export default class Button extends Component {
  state = {}

  onClick = ev => {
    ev.preventDefault()
    this.props.onClick ? this.props.onClick() : null
  }

  render = () => {
    const { label } = this.props
    const { onClick } = this

    return (
      <span>
        <button
          onClick={ onClick }>{ label }</button>
      </span>
    )
  }
}