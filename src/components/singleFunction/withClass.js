import React from 'react'

export default function withClass (className) {
  return Wrapping => props => {
    console.log(className)
    return <Wrapping
      { ...props }
      className={ className } />
  }
}