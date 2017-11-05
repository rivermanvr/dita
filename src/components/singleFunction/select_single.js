import React, { Component } from 'react';
import Select from 'react-select';

export default class SelectSingle extends Component {
  constructor() {
    super();
    this.state = { selection: '' };

    this.onInputChange = this.onInputChange.bind(this);
  }

  onInputChange(value) {
    console.log(value)
    this.setState({ selection: value });
    this.props.selection(value)
  }

  render() {
    /*
    Important Notes:

      this.props.options = items within the select.
      They are an array of objects as follows:
      options = [{ value: -string/number-, label: -display string- }]

      OnChange will also return current selected result back to the calling component.
      The return value is a number or a string value
      return prop = this.props.selection
    */
    const options = this.props.options;
    return (
      <div>
        <div>
          <Select
            name="form-field-select"
            className="Select"
            placeholder="make selection"
            value={ this.state.selection }
            options={ options }
            onChange={ this.onInputChange }
          />
        </div>
      </div>
    )
  }
}
