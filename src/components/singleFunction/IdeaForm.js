import React, { Component } from 'react';
import { connect } from 'react-redux';
import store from '../../store';
import { postIdea } from '../../actions/ideas';
import Select from './select_box';

class IdeaForm extends Component {
  constructor(){
    super()
    this.state = {
      title: '',
      idea: '',
      category: ''
    }
    this.handlechange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const key = event.target.name, val = event.target.value;
    key === "title" ? this.setState({ title: val }) :
    key === "idea" ? this.setState({ idea: val }) :
    this.setState({ category: val })
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.handleAdd(this.state);
  }

  render(){
    const { title, idea, category } = this.state;
    const { ideas, categories } = this.props;

    return (
      <div className="container">
        <h1>Post Idea</h1>
        (UNDER CONSTRUCTION)

        <form onSubmit={ this.handleSubmit }>
          <div className="form-group">
            <input name="title" type="text" ref="title" onChange={ this.handleChange }
            className="form-control" placeholder="Please enter title" />
          </div>

          <div className="form-group">
            <textarea name="idea" type="text" ref="idea"
            onChange={ this.handleChange }
            className="form-control" placeholder="Please enter idea" />
          </div>

          <select name="category" className="form-control" onChange={ this.handleChange }>
            <option>Select idea category</option>


          </select>

          <div className="form-group">
            <button type="submit" className="btn btn-primary">Post Idea</button>
          </div>

        </form>
        
      </div>
    )      
  }  
}

const mapStateToProps = ({ ideas, categories }) => {
  return {
    ideas,
    categories
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleAdd: (idea) => {
      dispatch(postIdea(idea));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(IdeaForm);

