import React, { Component } from 'react';
import { connect } from 'react-redux';

class storiesPosts_list extends Component {
  constructor() {
    super();
    this.state = { userStorylines: [], userPosts: [], currentUser: {}, allPosts: [] };
  }

  componentDidMount () {
    const allState = this.props.state;
    if (allState.userStorylines.length && allState.userPosts.length ) {
      this.setState({ userStorylines: allState.userStorylines,
        userPosts: allState.userPosts,
        currentUser: allState.currentUser.user,
        allPosts: allState.posts.posts
       })
    }
  }

  componentWillReceiveProps (nextProps) {
    const allState = nextProps.state;
    if (allState.userStorylines.length && allState.userPosts.length ) {
      this.setState({ userStorylines: allState.userStorylines,
        userPosts: allState.userPosts,
        currentUser: allState.currentUser.user,
        allPosts: allState.posts.posts
       })
    }
  }

  render() {

    console.log(this.state)
    const state = this.state
    const SL = JSON.stringify(state.userStorylines);
    const UP = JSON.stringify(state.userPosts);
    const CU = JSON.stringify(state.currentUser);
    const AP = JSON.stringify(state.allPosts);
    return (
      <div className="marginT marginB">
        <div className="row marginB">
          <div className="col-sm-2 center">
            <button className="btn btn-default" disabled>Create a new Story</button>
          </div>
          <div className="col-sm-8 btn-group center" role="group" aria-label="poststory">
            <button type="button" className="btn btn-default col-sm-6 center">Posts</button>
            <button type="button" className="btn btn-primary col-sm-6 center">Stories</button>
          </div>
          <div className="col-sm-2 center">
            <button className="btn btn-default" disabled>Graphics Version</button>
          </div>
        </div>
        <div className="row">
          <p>state: </p>
          <p>user storylines: { SL }</p>
          <p>user posts: { UP }</p>
          <p>current user: { CU }</p>
          <p>all posts: { AP }</p>
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return { state };
}

export default connect(mapStateToProps)(storiesPosts_list);