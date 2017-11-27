import React, { Component } from 'react'

export default class Textbox extends Component {
  state = {
    input: '',
    placeHolder: '',
    focused: false,
    isDirty: false,
    isRequired: false,
    isValid: true,
    styles: {
      // some styles here
      // can be expanded more via css
      span: { display: 'grid' },
      placeHolder: { color: '#BDBDBD' }
    }
  }

  componentDidMount = () => {
    this.setState({ ...this.state, ...this.props })
  }

  onChange = ev => {
    const isValid = this.state.isRequired ? ev.target.value ? true : false : this.state.isValid
    this.props.onChange(ev, isValid)
    this.setState({
      input: ev.target.value,
      isDirty: this.state.isDirty || true,
      isValid: isValid })
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
      isRequired,
      value } = this.props

    const {
      input,
      placeHolder,
      focused,
      isDirty,
      isValid,
      styles } = this.state

    const {
      onChange,
      onBlur,
      onFocus } = this

    return (
      <span style={ styles.span } className='textbox-container'>
        { label ? <label>{ `${label}${ isRequired ? '*' : '' }` }</label> : null }
        <input
          autoFocus={ focused }
          disabled={ disabled }
          value={ !focused && !value ? placeHolder : value }
          type={ !focused && !value ? 'text' : type }
          style={ !focused && !value ? styles.placeHolder : style }
          className={ `textbox ${className || ''}` }
          onChange={ onChange }
          onFocus={ onFocus }
          onBlur={ onBlur }
        />
        <span>
        { isDirty && !isValid ? `${label || 'this field'} is required` : '' } 
        </span>
      </span>
    )
  }
}