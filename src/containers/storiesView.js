import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Mover from '../components/singleFunction/moverControl';

class storiesView extends Component {
  constructor() {
    super();
    this.state = { userStorylines: [], userPosts: [], currentUser: {}, allPosts: [], toggle: 'stories', indexView: 0 };

    this.handleSelection = this.handleSelection.bind(this);
  }

  componentDidMount () {
    const allState = this.props.state;
    if (allState.userStorylines.length && allState.userPosts.length ) {
      const toggle = (this.props.location.pathname === '/postsView') ? 'posts' : 'stories';
      this.setState({ userStorylines: allState.userStorylines,
        userPosts: allState.userPosts,
        currentUser: allState.currentUser.user,
        allPosts: allState.posts,
        toggle
       })
    }
  }

  componentWillReceiveProps (nextProps) {
    const allState = nextProps.state;
    if (allState.userStorylines.length && allState.userPosts.length ) {
      const toggle = (nextProps.location.pathname === '/postsView') ? 'posts' : 'stories';
      this.setState({ userStorylines: allState.userStorylines,
        userPosts: allState.userPosts,
        currentUser: allState.currentUser.user,
        allPosts: allState.posts,
        toggle
       })
    }
  }

  handleSelection(arr) {
    console.log('from mover component: ', arr)
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
      <div className="container marginT marginB noPadLR">
        <div className="row marginB noPadLR noMarginLR">
          <div className="col-xs-12 noPadLR noMarginLR">

            <div className="col-xs-3 center noPadLR">
              <button className="btn btn-default" disabled>New Story</button>
            </div>

            <div className="col-xs-6 btn-group center noPadLR" role="group" aria-label="poststory">
              <Link to="/postsView"><button type="button" className="btn btn-default col-xs-6 center">Posts</button></Link>
              <Link to="/storiesView"><button type="button" className="btn btn-primary col-xs-6 center">Stories</button></Link>
            </div>

            <div className="col-xs-3 center noPadLR">
              <button className="btn btn-default" disabled>Graphics Version</button>
            </div>

          </div>
        </div>

        <div className="row marginBSM noMarginLR">
          <div className="col-xs-12 noMarginLR noPadLR">
            <Mover title={ 'Storylines' } selection={ this.handleSelection } />
          </div>
        </div>


        <div className="row col-sm-12 panel panel-default">
          <div>
          Storylines
          </div>
        </div>

        <div className="row col-sm-12 panel panel-default">
          <div>
          Posts & replies
          </div>
        </div>

        <div className="row marginBSM noMarginLR">
          <Mover title={ 'Posts' } selection={ this.handleSelection } />
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
