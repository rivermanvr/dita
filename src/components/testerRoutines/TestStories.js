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
        <p>This component is just a placeholder for the NavBar.</p>
        <p>Once my component works, I will replace this one with the working component</p>
        <p>make sure that you are logged in.</p>
      </div>
    )
  }
}

function mapStateToProps (state, { location }) {
  console.log('TestStories (in mapState: state: ', state);
  return { state, location };
}

export default connect(mapStateToProps)(TestStories);
