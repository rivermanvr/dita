import React, { Component } from 'react';
import { connect } from 'react-redux';
import store from '../../store';
import { addUserPost } from '../../actions/userposts';
import Select from './select_box';


class PostForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      title: '',
      body: '',
      storylineId: null,
      userId: props.currentUser.user.id,
      alert: '',
      alertStyle: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(event) {
    const key = event.target.name, val = event.target.value;
    this.setState({ [key]: val });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.handleAdd(this.state);

    !this.state.title ? this.setState({
      alert: "Please enter title",
      alertStyle: "alert alert-danger"
    }) : 
    !this.state.body ? this.setState({
      alert: "Please enter content",
      alertStyle: "alert alert-danger"
    }) :
    this.setState({
      alert: "New post has been added!",
      alertStyle: "alert alert-success"
    })
  }

  handleClick(){
    this.refs.title.value = "";
    this.refs.body.value = "";
  }

  render(){
    const { title, body, alert, alertStyle } = this.state;
    const { posts, storylines, currentUser } = this.props;
    const btnStyle = { marginTop: "10px" };
    const myStorylines = storylines.filter(storyline => {
      return storyline.userId === currentUser.user.id
    });
       
    return (
      <div>
        <form onSubmit={ this.handleSubmit }>
          <div className="form-group">
            <input name="title" type="text" ref="title" onChange={ this.handleChange }
            className="form-control" placeholder="Please enter title" />
          </div>

          <div className="form-group">
            <textarea name="body" type="text" ref="body"
            onChange={ this.handleChange }
            className="form-control" placeholder="Please enter content" />
          </div>  

          <select name="storylineId" className="form-control" onChange={ this.handleChange }>
            <option>Select Storyline</option>
            {
              myStorylines.map(mystoryline => {
                return (
                  <option key={ mystoryline.id } value={ mystoryline.id }>{ mystoryline.title }</option>
                )         
              })
            }
          </select>

          <div className="form-group">
            <button type="submit" disabled={ !currentUser.user.id } onClick={ this.handleClick } 
              className="btn btn-primary" style={ btnStyle }>Create Post
            </button>
          </div>          
        </form>
        
        { alert ? <div className={ alertStyle }>{ alert }</div> : "" }

      </div>
    )      
  }  
}

const mapStateToProps = ({ posts, storylines, currentUser }) => {
  return {
    posts,
    storylines,
    currentUser
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleAdd: (post) => {
      dispatch(addUserPost(post));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostForm);

