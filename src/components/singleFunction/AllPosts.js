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
      { 
        posts.posts.map(post => {
          return (
            <div className="list-group-item">
              <h4 className="list-group-item-heading">{ post.title } </h4>
              <p className="list-group-item-text">{ post.body }</p>
            </div>
          )
        })
      }           
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

