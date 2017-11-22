import React from 'react'

const injectComponent = Injecting => Wrapping =>
  props =>
    <div>
      <Wrapping { ...props } />
      { Injecting ? <Injecting { ...props } /> : null }
    </div>

export default injectComponent