import React, { Component } from 'react';
import { connect } from 'react-redux';

class TestStories extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    console.log('in render in TestStories: ', this.props)
    return (
      <div>
        I am in TestStories
      </div>
    )
  }
}

function mapStateToProps (state, { location }) {
  console.log('TestStories (in mapState: state: ', state);
  return { state, location };
}

export default connect(mapStateToProps)(TestStories);
