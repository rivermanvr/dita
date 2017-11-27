import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Mover from '../components/singleFunction/moverControl';

class postsView extends Component {
  constructor() {
    super();
    this.state = { currentUser: {}, postsUP: [],
      toggle: 'posts', UP: 0 };

    this.handleSelection = this.handleSelection.bind(this);
    this.initializeState = this.initializeState.bind(this);
    this.formatDates = this.formatDates.bind(this);
    this.handleTraverse = this.handleTraverse.bind(this);
  }

  componentDidMount () {
    const allProps = this.props;
    if (allProps.state.posts.length ) {
      this.initializeState(allProps);
    }
  }

  componentWillReceiveProps (nextProps) {
    const allProps = nextProps;
    if (allProps.state.posts.length ) {
      this.initializeState(allProps);
    }
  }

  initializeState (allProps, origin, name, action) {
    const allState = (origin) ? allProps : allProps.state;
    let toggle, postsUP;
    if (origin) toggle = allState.toggle;
    else toggle = (allProps.location.pathname === '/postsView') ? 'posts' : 'stories';
    if (origin) {
      postsUP = allState.postsUP;
    } else {
      postsUP = allState.userPosts.filter(post => {
        return !post.storylineId;
      })
    }

    let UP = this.state.UP;
    if (origin) {
      UP = this.handleTraverse(name, action);
      this.setState({ currentUser: allState.currentUser, postsUP, toggle, UP })
    } else {
      this.setState({ currentUser: allState.currentUser.user, postsUP, toggle, UP })
    }
  }

  handleTraverse (name, action) {
    const state = this.state;
    //start at index zero or follow the click event only for Storylines
    let value = 0;
    if (action === 'first') {
      value = 0;
    } else if (action === 'previous' && state[name] > 0) {
      value = state[name] - 1 ;
    } else if (action === 'next' ) {
      if (state.postsUP.length > state[name] + 1) value = state[name] + 1;
      else value = state[name];
    } else if (action === 'last') {
      value = state.postsUP.length - 1;
    }
    return value;
  }

  formatDates (dateIn) {
    return dateIn.slice(0, 10) + ' time: ' + dateIn.slice(11, 16);
  }

  handleSelection(arr) {
    //determine the array you are rendering
    const action = arr[1];
    /*  using moverControl returns:
    (name === 'SL') => 'userStorylines';
    (name === 'SLP') => 'userPosts';
    (name === 'SLR') => 'userReplies';
    (name === 'UP') => 'userAllPosts';
    */
    this.initializeState(this.state, 1, 'UP', action);
  }

  render() {
    const state = this.state;
    const userName = (state.currentUser.id) ? state.currentUser.name : '- guest -';
    const renderToggle = (<div className="row marginB noPadLR noMarginLR">
        <div className="col-xs-12 noPadLR noMarginLR">

          <div className="col-xs-3 center noPadLR">
            <button className="btn btn-default" disabled>Current User: <strong>{ userName }</strong></button>
          </div>

          <div className="col-xs-6 btn-group center noPadLR" role="group" aria-label="poststory">
            <Link to="/dev/postsView"><button type="button" className="btn btn-primary col-xs-6 center">Posts</button></Link>
            <Link to="/dev/storiesView"><button type="button" className="btn btn-default col-xs-6 center">Stories</button></Link>
          </div>

          <div className="col-xs-3 center noPadLR">
            <button className="btn btn-default" disabled>Graphics Version</button>
          </div>

        </div>
      </div>)
    if (!state.postsUP.length ) {
      return (
        <div className="marginT marginB noPadLR noMarginLR">
          { renderToggle }
          <div className="row panel panel-default center"><h5>-- No Private Posts Given Yet -- </h5></div>
        </div>);
    }
    // Selecting the proper post record that associates to a storyline:
    const post = state.postsUP[state.UP];
    // formating dates
    const dateUpdatedSLP = (post.updatedAt) ? this.formatDates(post.updatedAt) : '-- none --';
    //-----------------------
    const toggle = this.state.toggle;
    return (
      <div className="marginT marginB noPadLR noMarginLR">
        { renderToggle }

        <div className="row noMarginLR">
          <Mover title={ 'Posts' } name={ 'SLP' } selection={ this.handleSelection } renderBtn={ 'Post' } />
        </div>

        <div className="row panel panel-default center">
          <div className="col-xs-12 noPadLR">
            <div className="col-xs-1 noPadLR pull-left"><h5>ID: </h5></div>
            <div className="col-xs-1 moveDown07 noPadLR">{ post.id }</div>
            <div className="col-xs-2 noPadLR"><h5>Updated: </h5></div>
            <div className="col-xs-3 moveDown07">{ dateUpdatedSLP }</div>
            <div className="col-xs-2 noPadLR"><h5>Zip - (Lat / Long): </h5></div>
            <div className="col-xs-3 moveDown07">{ post.zip } - ({ post.latitude } / { post.longitude })</div>
          </div>

          <div className="col-xs-12 noPadLR">
            <div className="col-xs-1 noPadLR pull-left"><h5>Title: </h5></div>
            <div className="col-xs-9 moveDown07">{ post.title }</div>
          </div>

          <div className="col-xs-12 noPadLR">
            <div className="col-xs-1 noPadLR pull-left"><h5>Post Body: </h5></div>
            <div className="col-xs-9 moveDown07">{ post.body }</div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return { state };
}

export default connect(mapStateToProps)(postsView);
