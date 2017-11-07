import React, { Component } from 'react';

import Select from './select_box';

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

    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(obj) {
    console.log('in TestBed, selectBox: ', obj);
    this.setState({ selection: obj })
  }

  render() {
    return (
      <div>
        <h4>TestBed - available components:</h4>
        <div className="well">
          <h5>Using 'react-select' module, this is a multi &/or single select select box:</h5>
          <ul>
            <li>div wrap & render: select_box.js component</li>
            <li>Look at the TestBed.js component to see what is passed into this component</li>
            <li>Look at select_box.js to see important comments</li>
            <li><hr /></li>
            <li><h5>The component is a multi &/or Single select Box:</h5></li>
          </ul>
          <Select options={ this.state.options } selection={ this.handleSelect } multi={ true } create={ true } />
        </div>
      </div>
    )
  }
}
