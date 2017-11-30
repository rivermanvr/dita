import React, { Component } from 'react'

export default class Button extends Component {
  state = {}

  onClick = ev => {
    ev.preventDefault()
    this.props.onClick ? this.props.onClick() : null
  }

  render = () => {
    const {
      label,
      disabled,
      className } = this.props
    const { onClick } = this

    return (
      <span style={ { display: `${ className && className.match(/inline/g) ? 'inline-block' : 'block' }` } }>
        <button
          disabled={ disabled }
          onClick={ onClick }
          className={ className }>{ label }</button>
      </span>
    )
  }
}