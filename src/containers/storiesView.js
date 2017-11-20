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
    const lenStateData = this.state[dataName].length; 
    console.log('len', dataName, lenStateData)

    //start at index zero or follow the click event
    let value = 0;
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
    console.log('>>>state>>>>>', this.state);
    // current storyline:
    const currentSL = state.userStorylines[state.SL];
    // formating dates
    let dateUpdated = currentSL.updatedAt.slice(0, 10) + ' time: ';
    dateUpdated += currentSL.updatedAt.slice(11, 16);
    let dateCreated = currentSL.createdAt.slice(0, 10) + ' time: ';
    dateCreated += currentSL.createdAt.slice(11, 16);
    // description may be null.
    const descriptionSL = (currentSL.description) ? currentSL.description : '-- none --'

    // else storyline1 = state.userStorylines[state.SL].description;
    // if (state.userStorylines[state.SL].title && state.userStorylines[state.SL].description) storyline2 = state.userStorylines[state.SL].description;
    // // storyline posts filter
    // const SLPosts = state.userPosts.filter(post => {
    //   return post.storylineId === state.userStorylines[state.SL].id && post.userId === state.currentUser.id;
    // })
    // console.log('>>>>>>>userPosts>>>>>', SLPosts);
    //-----------------------


    const toggle = this.state.toggle
    const SL = JSON.stringify(state.userStorylines);
    const UP = JSON.stringify(state.userPosts);
    const CU = JSON.stringify(state.currentUser);
    const AP = JSON.stringify(state.allPosts);
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
          Posts
          </div>
        </div>

        <div className="container">
          <div className="row noMarginLR">
            <div className="col-xs-12 noMarginLR noPadLR">
              <Mover title={ 'Replies' } name={ 'SLR' } selection={ this.handleSelection } />
        </div></div></div>

        <div className="row col-sm-12 panel panel-default">
          <div>
          Replies
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
