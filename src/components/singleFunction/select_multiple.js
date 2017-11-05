import React, { Component } from 'react';
import Select from 'react-select';

export default class TestBed extends Component {
  constructor() {
    super();
    this.state = { select: [] };

    this.onInputChange = this.onInputChange.bind(this);
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

  onInputChange(event) {
    const value = event.target.value;
    const label = event.target.label
    console.log(value)
    // this.setState({ select: [{ label: value }] });
  }

  options() {
    return [
      { value: 0 },
      {  value: 1, label: 'One'},
      {  value: 2, label: 'Two'},
      {  value: 3, label: 'Three'},
      {  value: 4, label: 'Four'}
    ]
  }

  render() {
    const options = this.options();
    return (
      <div>
        <div>
          <Select
            name="form-field-select"
            className="Select"
            value={ 0 }
            options={ options }
            onChange={ this.onInputChange }
          />
        </div>
      </div>
    )
  }
}
