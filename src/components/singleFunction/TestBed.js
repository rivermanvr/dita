import React, { Component } from 'react';

import SelectMulti from './select_multiple';
import SelectSingle from './select_single';

export default class TestBed extends Component {
  constructor() {
    super();
    this.state = { selection: [], options:
      [
        { value: 0 },
        {  value: 1, label: 'One'},
        {  value: 2, label: 'Two'},
        {  value: 3, label: 'Three'},
        {  value: 4, label: 'Four'}
      ]
    };

    this.handleSelect = this.handleSelect.bind(this)

  }


  handleSelect(obj) {
    console.log('in TestBed, selectBoxes: ', obj);
    this.setState({ selection: obj })
  }


  render() {
    
    return (
      <div>
        <h4>TestBed - available components:</h4>

        <div className="colWidth60 well">
          <h5>Using 'react-select' module, this is a multi-select select box:</h5>
          <ul>
            <li>div wrap & render: select_multiple.js component</li>
          </ul>
          <SelectMulti options={ this.state.options } selection={ this.handleSelect } />
        </div>

        <div className="colWidth60 well">
          <h5>Using 'react-select' module, this is a single-select select box:</h5>
          <ul>
            <li>div wrap & render: select_single.js component</li>
          </ul>
          <SelectSingle options={ this.state.options } selection={ this.handleSelect } />
        </div>
      </div>
    )
  }
}
