import React, { Component } from 'react';
import { connect } from 'react-redux';
import store from '../../store';
import { fetchPosts } from '../../actions/posts';
import { PostCard } from './Posts';

class AllPosts extends Component {
  constructor(props){
    super(props);
  }

  render(){
    const { posts } = this.props;

    return (
      <div>
        <h4>All posts</h4>
        { posts.posts.map(post => <PostCard key={ post.id } content={ post } />) }           
      </div>
    )
  }    
}

const mapStateToProps = ({ posts }) => {
  return {
    posts
  }
}

export default connect(mapStateToProps)(AllPosts);

