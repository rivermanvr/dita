import React, { Component } from 'react';
import { connect } from 'react-redux';
import store from '../../store';
import { addPost } from '../../actions/posts';
import Select from './select_box';
import Button from '../reusables/Button';
import Textbox from '../reusables/Textbox';


class PostForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      title: '',
      body: '',
      storylines: '',
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
    console.log(event.target.value)
    const key = event.target.name, val = event.target.value;
    this.setState({ [key]: val })
  }

  handleSubmit(event) {
    console.log('button clicked')
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

  handleSelect(obj){
    this.setState({ selection: obj })
  }

  render(){
    const { title, body, storylines, alert, alertStyle } = this.state;
    const { posts } = this.props;
    const btnStyle = { marginTop: "10px" }

    return (
      <div>
        <form onSubmit={ this.handleSubmit }>
          <div className="form-group">        
            <Textbox 
              value={ title }
              name='title'
              placeHolder='Please enter title'
              className='form-control'
              onChange={ this.handleChange } />
          </div>

          <div className="form-group">    
            <Textbox 
              value={ body }
              name='body'
              placeHolder='Please enter content'
              className='form-control'
              onChange={ this.handleChange } />
          </div>

          <div className="form-group">    
            <Select 
              options={ this.state.options } 
              selection={ this.handleSelect } 
              multi={ true } />   
          </div>     
          
          <div className="form-group">    
            <Button 
              label='Add Post' 
              className='btn btn-primary' 
              style={ btnStyle } />
          </div>          
        </form> 

        { alert ? <div className={ alertStyle }>{ alert }</div> : "" }
      </div>
    )      
  }  
}

const mapStateToProps = ({ posts }) => {
  return {
    posts
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleAdd: (post) => {
      dispatch(addPost(post));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostForm);

