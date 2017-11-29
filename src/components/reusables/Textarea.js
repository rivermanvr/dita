import React, { Component } from 'react'

export default class Textbox extends Component {
  state = {
    placeHolder: '',
    focused: false,
    styles: {
      // some styles here
      // can be expanded more via css
      span: {
        display: 'flex',
        flexDirection: 'column'
      },
      placeHolder: { color: '#BDBDBD' }
    }
  }

  componentDidMount = () => {
    this.setState({ ...this.state, ...this.props })
  }

  onChange = ev => {
    this.props.onChange(ev)
  }

  onFocus = ev => {
    this.setState({ focused: true })
  }

  onBlur = ev => {
    this.setState({ focused: false })
  }

  render = () => {
    const { 
      label,
      disabled,
      type,
      style,
      className,
      required,
      rows,
      value } = this.props

    const {
      placeHolder,
      focused,
      styles } = this.state

    const {
      onChange,
      onBlur,
      onFocus } = this

    return (
      <span style={ styles.span }>
        { label ? <label>{ label }</label> : null }
        <textarea
          rows={ rows || '25' }
          required={ required }
          autoFocus={ focused }
          disabled={ disabled }
          value={ !focused && !value ? placeHolder : value }
          type={ !focused && !value ? 'text' : type }
          style={ !focused && !value ? styles.placeHolder : style }
          className={ `textarea ${className || ''}` }
          onChange={ onChange }
          onFocus={ onFocus }
          onBlur={ onBlur } ></textarea>
      </span>
    )
  }
}