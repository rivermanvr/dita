import React from 'react'

export default function Message ({ body }) {
  return (
    <div className='message-container'>
      <div>{ body }</div>
    </div>
  )
}