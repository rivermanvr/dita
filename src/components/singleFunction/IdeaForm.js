import React, { Component } from 'react';
import { connect } from 'react-redux';
import store from '../../store';
import { postIdea } from '../../actions/ideas';
import Select from './select_box';

class IdeaForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      title: '',
      idea: '',
      category: '',
      selection: [],
      options: [{ value: 'work', label: 'work' }, { value: 'food', label: 'food' }],
      alert: '',
      alertStyle: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleChange(event) {
    const key = event.target.name, val = event.target.value;
    this.setState({ [key]: val })
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.handleAdd(this.state);

    !this.state.title ? this.setState({
      alert: "Please enter title",
      alertStyle: "alert alert-danger"
    }) : 
    !this.state.idea ? this.setState({
      alert: "Please enter idea",
      alertStyle: "alert alert-danger"
    }) :
    this.setState({
      alert: "New post has been added!",
      alertStyle: "alert alert-success"
    })
  }

  handleSelect(obj){
    this.setState({ selection: obj })
  }


  render(){
    const { title, idea, category, alert, alertStyle } = this.state;
    const { ideas, categories } = this.props;
    const btnStyle = { marginTop: "10px" }

    return (
      <div className="container">
        <h1>Post Idea</h1>
        (UNDER CONSTRUCTION!!!!)

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

          <Select options={ this.state.options } selection={ this.handleSelect } multi={ true } />

          <div className="form-group">
            <button type="submit" className="btn btn-primary" style={ btnStyle }>Post Idea</button>
          </div>

        </form>

        { alert ? <div className={ alertStyle }>{ alert }</div> : "" }
        
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

