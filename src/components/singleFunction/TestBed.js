import React, { Component } from 'react';

export default class TestBed extends Component {
  constructor() {
    super();
    this.state = { select: [], options: [] };

  }

  render() {
    return (
      <div>
        <h4>TestBed - available components:</h4>
        <div className="colWidth60">
          select component here
        </div>
      </div>
    )
  }
}
