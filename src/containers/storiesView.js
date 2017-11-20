import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Mover from '../components/singleFunction/moverControl';

class storiesView extends Component {
  constructor() {
    super();
    this.state = { userStorylines: [], userPosts: [], currentUser: {}, allPosts: [], toggle: 'stories', indexStories: 0, SL: 0, SLP: 0, AP: 0 };

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
        toggle, SL: 0, SLP: 0, AP: 0
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
        toggle, SL: 0, SLP: 0, AP: 0
       })
    }
  }

  handleSelection(arr) {
    //determine the array you are rendering
    const name = arr[0];
    let dataName = '';
    if (name === 'SL') dataName = 'userStorylines';
    else if (name === 'SLP') dataName = 'userPosts';
    else if (name === 'UP') dataName = 'vin';



    //start at index zero or follow the click event
    let value = 0
    if (arr[1] === 'first') value = 0;
    else if (arr[1] === 'previous' && this.state[name] > 0) value = this.state[name] - 1;
    else if (arr[1] === 'next' ) value = 0; //============
    else if (arr[1] === 'last') value = 0;  //============
    console.log('from mover component: ', name, value)
    this.setState({ name: value })
  }

  render() {
    const state = this.state;
    if (!state.userStorylines.length || !state.userPosts.length ) return <div />;
    console.log('>>>>>>>>', this.state);
    // storyline title & description info
    let storyline1 = '', storyline2 = '';
    if (state.userStorylines[state.SL].title) storyline1 = state.userStorylines[state.SL].title;
    else storyline1 = state.userStorylines[state.SL].description;
    if (state.userStorylines[state.SL].title && state.userStorylines[state.SL].description) storyline2 = state.userStorylines[state.SL].description;
    // storyline posts filter
    const SLPosts = state.userPosts.filter(post => {
      return post.storylineId === state.userStorylines[state.SL].id && post.userId === state.currentUser.id;
    })
    console.log('>>>>>>>userPosts>>>>>', SLPosts);
    //-----------------------
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
            <Mover title={ 'Storylines' } name={ 'SL' } selection={ this.handleSelection } />
          </div>
        </div>

        <div className="row col-xs-12 panel panel-default">
          <div className="col-xs-2 noPadLR"><h5>Storyline: </h5></div>
          <div className="col-xs-9 noPadLR">{ storyline1 }</div>
          <div className="col-xs-9 noPadLR">{ storyline2 }</div>
        </div>

        <div className="row col-sm-12 panel panel-default">
          <div>
          Posts & replies
          </div>
        </div>

        <div className="row marginBSM noMarginLR">
          <Mover title={ 'Posts' } name={ 'SLP' } selection={ this.handleSelection } />
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
