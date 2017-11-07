import React, { Component } from 'react';
import { connect } from 'react-redux';
import store from '../../store';

class Home extends Component {
  constructor(props){
    super(props);

  }

  render(){
    return (
      <div>
        <h1>Home!!!!</h1> 

      </div>
    )
  }
    
}

const mapStateToProps = ({ posts }) => {
  return {
    posts
  }
}

export default connect(mapStateToProps, null)(Home);