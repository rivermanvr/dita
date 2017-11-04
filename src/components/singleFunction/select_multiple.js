import React, { Component } from 'react';
import Select from 'react-select';

export default class TestBed extends Component {
  constructor() {
    super();
    this.state = { select: [], options: [] };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.options = this.options.bind(this);
  }

  componentDidMount(){
  }

  componentWillReceiveProps(nextProps) {
    //there is also: currentProps
    if (!nextProps.selectedTest.id) return;
    this.setState({
      id: nextProps.selectedTest.id,
      name: nextProps.selectedTest.name,
      errorAdd: ''
    })
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.name) {
      const testChg = this.state;
      testChg.photo = this.props.selectedTest.photo;
      this.props.updateTest(testChg);
    } else {
      this.setState({ errorAdd: 'Name cannot be blank', name: this.state.test.name });
    }
  }

  handleInput(event) {
    const value = event.target.value;
    this.setState({ select: [] });
  }

  options() {
    return [
      {  value: 'one', label: 'One'},
      {  value: 'two', label: 'Two'},
      {  value: 'three', label: 'Three'},
      {  value: 'four', label: 'Four'}
    ]
  }

  render() {
    return (
      <div>
        <h4>TestBed component</h4>
        <div className="well">
          <Select
            name="select"
            value='One'
            options={ this.state.options }
            onChange={ this.handleInput }
          />
        </div>
      </div>
    )
  }
}
