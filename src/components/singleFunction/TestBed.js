import React, { Component } from 'react';

import Select from './select_multiple';

export default class TestBed extends Component {
  constructor() {
    super();
    this.state = { select: [], options: [] };

  }

  render() {
    
    return (
      <div>
        <h4>TestBed - available components:</h4>
        <div className="colWidth60 well">
        <label>
          Using 'react-select', this is a multi-select select box:
        </label>
          <Select />
        </div>
      </div>
    )
  }
}
