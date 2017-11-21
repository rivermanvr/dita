import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Mover from '../components/singleFunction/moverControl';

class storiesView extends Component {
  constructor() {
    super();
    this.state = { userStorylines: [], userPosts: [], currentUser: {},
      postsSLP: [], postsUP: [],
      toggle: 'stories', SL: 0, SLP: 0, SLR: 0, UP: 0 };

    this.handleSelection = this.handleSelection.bind(this);
    this.initializeState = this.initializeState.bind(this);
  }

  initializeState (allProps) {
    console.log('in initialize')
    const allState = allProps.state;
    const toggle = (allProps.location.pathname === '/postsView') ? 'posts' : 'stories';
    let postsSLP = [], postsUP = [];
    // if toggle is 'posts', then populate postsUP in state.
    if (toggle === 'posts') {
      postsUP = allState.userPosts.filter(post => {
        return !post.storylineId;
      })
    // if toggle is 'stories', then populate postsSLP.
    } else {
        postsSLP = allState.userPosts.filter(post => {
          return post.storylineId === allState.userStorylines[this.state.SL].id;
        })
    }
    //------------------------------------------------------
    this.setState({ userStorylines: allState.userStorylines,
      userPosts: allState.userPosts,
      currentUser: allState.currentUser.user,
      postsSLP,
      postsUP,
      toggle
     })
  }

  componentDidMount () {
    console.log('>>>>>>>>>>in DID>>>>>>>', this.props)
    const allProps = this.props;
    if (allProps.state.userStorylines.length && allProps.state.userPosts.length ) {
      this.initializeState(allProps);
    }
  }

  componentWillReceiveProps (nextProps) {
    console.log('>>>>>>>>>>in Will>>>>>>>', nextProps)
    const allProps = nextProps;
    if (allProps.state.userStorylines.length && allProps.state.userPosts.length ) {
      this.initializeState(allProps);
    }
  }

  handleSelection(arr) {
    //determine the array you are rendering
    const state = this.state;
    const name = arr[0];
    /*  using moverControl returns:
    if (name === 'SL') => 'userStorylines';
    if (name === 'SLP') dataName = 'userPosts';
    if (name === 'SLR') dataName = 'userReplies';
    if (name === 'UP') dataName = 'userAllPosts';
    */
   const lenSL = state.userStorylines.length;
   let lenSLP = 0, lenSLR = 0, lenUP = 0;
  

    //start at index zero or follow the click event
    let value = 0;
    if (arr[1] === 'first') value = 0;
    else if (arr[1] === 'previous' && this.state[name] > 0) value = this.state[name] - 1;
    else if (arr[1] === 'next' ) value = 0; //==============================
    else if (arr[1] === 'last') value = 0;  //==============================
    console.log('from mover component: ', name, value)
    this.setState({ name: value })
  }

  render() {
    const state = this.state;
    if (!state.userStorylines.length || !state.userPosts.length ) return <div />;
    console.log('>>>state in render>>>>>', this.state);
    // current storyline:
    const currentSL = state.userStorylines[state.SL];
    // formating dates
    let dateUpdated = currentSL.updatedAt.slice(0, 10) + ' time: ';
    dateUpdated += currentSL.updatedAt.slice(11, 16);
    let dateCreated = currentSL.createdAt.slice(0, 10) + ' time: ';
    dateCreated += currentSL.createdAt.slice(11, 16);
    // description may be null.
    const descriptionSL = (currentSL.description) ? currentSL.description : '-- none --'
    //-----------------------
    const toggle = this.state.toggle
    return (
      <div className="container marginT marginB noPadLR noMarginLR">

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

        <div className="container">
          <div className="row noMarginLR">
            <div className="col-xs-12 noMarginLR noPadLR">
              <Mover title={ 'Storylines' } name={ 'SL' } selection={ this.handleSelection } />
        </div></div></div>

        <div className="container">
          <div className="row col-xs-12 panel panel-default center">

            <div className="col-xs-12 noPadLR">
              <div className="col-xs-1 noPadLR pull-left"><h5>ID: </h5></div>
              <div className="col-xs-1 moveDown07 noPadLR">{ currentSL.id }</div>
              <div className="col-xs-2 noPadLR"><h5>Updated: </h5></div>
              <div className="col-xs-3 moveDown07">{ dateUpdated }</div>
              <div className="col-xs-2 noPadLR"><h5>Created: </h5></div>
              <div className="col-xs-3 moveDown07">{ dateCreated }</div>
            </div>

            <div className="col-xs-12 noPadLR">
              <div className="col-xs-1 noPadLR pull-left"><h5>Title: </h5></div>
              <div className="col-xs-9 moveDown07">{ currentSL.title }</div>
            </div>

            <div className="col-xs-12 noPadLR">
              <div className="col-xs-1 noPadLR pull-left"><h5>Description: </h5></div>
              <div className="col-xs-9 moveDown07">{ descriptionSL }</div>
            </div>

        </div></div>

        <div className="container">
          <div className="row noMarginLR">
            <div className="col-xs-12 noMarginLR noPadLR">
              <Mover title={ 'Posts' } name={ 'SLP' } selection={ this.handleSelection } />
        </div></div></div>

        <div className="row col-sm-12 panel panel-default">
          <div>
            { this.state.postsSLP[this.state.SLP].id } --
            { this.state.postsSLP[this.state.SLP].zip } --
            { this.state.postsSLP[this.state.SLP].latitude } --
            { this.state.postsSLP[this.state.SLP].longitude } --
            { this.state.postsSLP[this.state.SLP].updatedAt } --
            { this.state.postsSLP[this.state.SLP].title } --
            { this.state.postsSLP[this.state.SLP].body }
          </div>
        </div>

        <div className="container">
          <div className="row noMarginLR">
            <div className="col-xs-12 noMarginLR noPadLR">
              <Mover title={ 'Replies' } name={ 'SLR' } selection={ this.handleSelection } />
        </div></div></div>

        <div className="row col-sm-12 panel panel-default">
          <div>
            { this.state.postsSLP[this.state.SLP].replies[this.state.SLR].id } --
            { this.state.postsSLP[this.state.SLP].replies[this.state.SLR].user.name } --
            { this.state.postsSLP[this.state.SLP].replies[this.state.SLR].updatedAt } --
            { this.state.postsSLP[this.state.SLP].replies[this.state.SLR].body }
          </div>
        </div>

        <div className="row col-sm-12">
          <h4><p>View = { toggle }</p></h4>
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return { state };
}

export default connect(mapStateToProps)(storiesView);
