import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class storiesView extends Component {
  constructor() {
    super();
    this.state = { userStorylines: [], userPosts: [], currentUser: {}, allPosts: [], toggle: 'stories' };
  }

  componentDidMount () {
    console.log('DidM - props: ', this.props)
    const allState = this.props.state;
    if (allState.userStorylines.length && allState.userPosts.length ) {
      const toggle = (this.props.location.pathname === '/postsView') ? 'posts' : 'stories';
      this.setState({ userStorylines: allState.userStorylines,
        userPosts: allState.userPosts,
        currentUser: allState.currentUser.user,
        allPosts: allState.posts.posts,
        toggle
       })
    }
  }

  componentWillReceiveProps (nextProps) {
    console.log('WillM - props: ', nextProps)
    const allState = nextProps.state;
    if (allState.userStorylines.length && allState.userPosts.length ) {
      const toggle = (nextProps.location.pathname === '/postsView') ? 'posts' : 'stories';
      this.setState({ userStorylines: allState.userStorylines,
        userPosts: allState.userPosts,
        currentUser: allState.currentUser.user,
        allPosts: allState.posts.posts,
        toggle
       })
    }
  }

  render() {

    console.log(this.state);
    const state = this.state;
    const toggle = this.state.toggle
    const SL = JSON.stringify(state.userStorylines);
    const UP = JSON.stringify(state.userPosts);
    const CU = JSON.stringify(state.currentUser);
    const AP = JSON.stringify(state.allPosts);
    return (
      <div className="container marginT marginB">
        <div className="row marginB">
          <div className="col-sm-2 center">
            <button className="btn btn-default" disabled>Create a new Story</button>
          </div>
          <div className="col-sm-8 btn-group center" role="group" aria-label="poststory">
            <Link to="/postsView"><button type="button" className="btn btn-default col-sm-6 center">Posts</button></Link>
            <Link to="/storiesView"><button type="button" className="btn btn-primary col-sm-6 center">Stories</button></Link>
          </div>
          <div className="col-sm-2 center">
            <button className="btn btn-default" disabled>Graphics Version</button>
          </div>
        </div>
        <div className="row col-sm-12 center marginB marginTSM">
          <div className="col-sm-2 center"><h5>{ state.userStorylines.length } Storyline(s)</h5></div>
          <div className="col-sm-1">traverse bar here</div>
        </div>

<div className="row col-sm-12 panel panel-default">
  <div>
  hello
  </div>
</div>

        <div className="row col-sm-12">
          <h4><p>View = { toggle }</p></h4>
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

export default connect(mapStateToProps)(storiesView);