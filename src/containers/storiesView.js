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
    let toggle, postsSLP = [], postsUP = [], value = 0, SLMade = false, SLMadeArr = [];
    if (origin) toggle = allState.toggle;
    else toggle = (allProps.location.pathname === '/postsView') ? 'posts' : 'stories';
      if (origin) {
        value = (name === 'SL') ? this.handleTraverse(name, action, allState) : this.state.SL;
        postsSLP = allState.userPosts.filter(post => {
          return post.storylineId === allState.userStorylines[value].id;
        })
        value = (name !== 'SL') ? this.handleTraverse(name, action, allState, postsSLP) : value;
      } else {
        if (allState.userStorylines[this.state.SL]) {
          postsSLP = allState.userPosts.filter(post => {
            return post.storylineId === allState.userStorylines[this.state.SL].id;
          })
        } else {
          // sometimes the set_user_storylines action is too slow!!!!!
          SLMade = true;
          SLMadeArr = allState.storylines.filter(story => {
            return story.userId === allState.currentUser.user.id;
          })
          postsSLP = allState.userPosts.filter(post => {
            return post.storylineId === SLMadeArr[this.state.SL].id;
          })
        }
      }
    //------------------------------------------------------
    let SL, SLP, SLR;
    if (name === 'SLR') SLR = value;
    else if (name === 'SLP' || name === 'SL') SLR = 0;
    else SLR = this.state.SLR;

    if (name === 'SLP') {
      SLP = value
      SL = this.state.SL;
    } else if (name === 'SL') {
      SLP = 0;
      SL = value;
    } else {
      SLP = this.state.SLP;
      SL = this.state.SL;
    }
    if (origin) {
      this.setState({ userStorylines: allState.userStorylines,
        postsSLP,
        postsUP,
        SL, SLP, SLR
      })
    } else if (SLMade) {
      this.setState({ userStorylines: SLMadeArr,
        userPosts: allState.userPosts,
        currentUser: allState.currentUser.user,
        postsSLP,
        postsUP,
        toggle
      })
    } else {
      this.setState({ userStorylines: allState.userStorylines,
        userPosts: allState.userPosts,
        currentUser: allState.currentUser.user,
        postsSLP,
        postsUP,
        toggle
      })
    }
  }

  handleTraverse (name, action, allState, postsSLP) {
    const state = this.state;
    //start at index zero or follow the click event only for Storylines
    let value = 0;
    if (action === 'first') {
      value = 0;
    } else if (action === 'previous' && state[name] > 0) {
      value = state[name] - 1 ;
    } else if (action === 'next' ) {
      if (name === 'SL' ) {
        if (allState.userStorylines.length > state[name] + 1) value = state[name] + 1;
        else value = state[name];
      } else if (name === 'SLP' ) {
        if (postsSLP.length > state[name] + 1) value = state[name] + 1;
        else value = state[name];
      } else if (name === 'SLR' ) {
        if (postsSLP[this.state.SLP].replies.length > state[name] + 1) value = state[name] + 1;
        else value = state[name];
      }
    } else if (action === 'last') {
      if (name === 'SL' ) {value = allState.userStorylines.length - 1}
      else if (name === 'SLP' ) { value = postsSLP.length - 1 }
      else if (name === 'SLR' ) {
        value = postsSLP[this.state.SLP].replies.length - 1
      }
    }
    return value;
  }

  formatDates (dateIn) {
    return dateIn.slice(0, 10) + ' time: ' + dateIn.slice(11, 16);
  }

  handleSelection(arr) {
    //determine the array you are rendering
    const name = arr[0];
    const action = arr[1];
    /*  using moverControl returns:
    (name === 'SL') => 'userStorylines';
    (name === 'SLP') => 'userPosts';
    (name === 'SLR') => 'userReplies';
    (name === 'UP') => 'userAllPosts';
    */
    this.initializeState(this.state, 1, name, action);
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
            <Link to="/dev/postsView"><button type="button" className="btn btn-default col-xs-6 center">Posts</button></Link>
            <Link to="/dev/storiesView"><button type="button" className="btn btn-primary col-xs-6 center">Stories</button></Link>
          </div>

          <div className="col-xs-3 center noPadLR">
            <button className="btn btn-default" disabled>Graphics Version</button>
          </div>

        </div>
      </div>)
    if (!state.userStorylines.length || !state.userPosts.length ) {
      return (
        <div className="marginT marginB noPadLR noMarginLR">
          { renderToggle }
          <div className="row panel panel-default center"><h5>-- No Storylines Given Yet -- </h5></div>
        </div>);
    }
    // current storyline:
    const currentSL = state.userStorylines[state.SL];
    // Selecting the proper post record that associates to a storyline:
    const post = state.postsSLP[this.state.SLP];
    // Selecting the proper reply record that associates to a storyline/post:
    const replies = post.replies[this.state.SLR];
    // formating dates
    const dateUpdatedSL = this.formatDates(currentSL.updatedAt);
    const dateCreatedSL = this.formatDates(currentSL.createdAt);
    const dateUpdatedSLP = (post.updatedAt) ? this.formatDates(post.updatedAt) : '-- none --';
    const dateUpdatedSLR = (replies) ? this.formatDates(replies.updatedAt) : '-- none --';
    // description may be null.
    const descriptionSL = (currentSL.description) ? currentSL.description : '-- none --'
    const renderReplies = (!replies) ? <div className="row panel panel-default center"><h5>-- No Replies Given Yet -- </h5></div> : (<div>
        <div className="row noMarginLR">
          <Mover title={ 'Replies' } name={ 'SLR' } selection={ this.handleSelection } />
        </div>
        <div className="row panel panel-default center">
          <div className="col-xs-12 noPadLR">
            <div className="col-xs-1 noPadLR pull-left"><h5>ID: </h5></div>
            <div className="col-xs-1 moveDown07 noPadLR">{ replies.id }</div>
            <div className="col-xs-2 noPadLR"><h5>Updated: </h5></div>
            <div className="col-xs-3 moveDown07">{ dateUpdatedSLR }</div>
            <div className="col-xs-2 noPadLR"><h5>User Name: </h5></div>
            <div className="col-xs-3 moveDown07">{ replies.user.name }</div>
          </div>
          <div className="col-xs-12 noPadLR">
            <div className="col-xs-1 noPadLR pull-left"><h5>Reply Body: </h5></div>
            <div className="col-xs-9 moveDown07">{ replies.body }</div>
          </div>
        </div>
        <div className="col-xs-12 center noPadLR">
          <button className="btn btn-default center" disabled>Respond to this Reply</button>
        </div>
      </div>);
    //-----------------------
    const toggle = this.state.toggle;
    return (
      <div className="marginT marginB noPadLR noMarginLR">
        { renderToggle }
        <div className="row noMarginLR">
          <Mover title={ 'Storylines' } name={ 'SL' } selection={ this.handleSelection } renderBtn={ 'Story' } />
        </div>
        <div className="row panel panel-default center">
          <div className="col-xs-12 noPadLR">
            <div className="col-xs-1 noPadLR pull-left"><h5>ID: </h5></div>
            <div className="col-xs-1 moveDown07 noPadLR">{ currentSL.id }</div>
            <div className="col-xs-2 noPadLR"><h5>Updated: </h5></div>
            <div className="col-xs-3 moveDown07">{ dateUpdatedSL }</div>
            <div className="col-xs-2 noPadLR"><h5>Created: </h5></div>
            <div className="col-xs-3 moveDown07">{ dateCreatedSL }</div>
          </div>
          <div className="col-xs-12 noPadLR">
            <div className="col-xs-1 noPadLR pull-left"><h5>Title: </h5></div>
            <div className="col-xs-9 moveDown07">{ currentSL.title }</div>
          </div>
          <div className="col-xs-12 noPadLR">
            <div className="col-xs-1 noPadLR pull-left"><h5>Description: </h5></div>
            <div className="col-xs-9 moveDown07">{ descriptionSL }</div>
          </div>
        </div>

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
        { renderReplies }
      </div>
    )
  }
}

function mapStateToProps (state) {
  return { state };
}

export default connect(mapStateToProps)(storiesView);
