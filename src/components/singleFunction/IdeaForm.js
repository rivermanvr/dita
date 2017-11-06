import React, { Component } from 'react';
import store from '../../store';
import { postIdea } from '../../actions/ideas';

class IdeaForm extends Component {
  constructor(){
    super()
    this.state = {
      title: '',
      idea: '',
      category: ''
    }
    this.handlechange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const key = event.target.name, val = event.target.value;
    key === "title" ? this.setState({ title: val }) :
    key === "idea" ? this.setState({ idea: val }) :
    this.setState({ category: val })
  }



  render(){
    return (
      <div className="container">
        <h1>Post Idea</h1>
        (UNDER CONSTRUCTION)

        <form>
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

export default IdeaForm;

