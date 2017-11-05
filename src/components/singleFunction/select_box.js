import React, { Component } from 'react';
import Select, { Creatable } from 'react-select';

export default class SelectMulti extends Component {
  constructor() {
    super();
    this.state = { selection: '' };

    this.onInputChange = this.onInputChange.bind(this);
  }

  onInputChange(obj) {
    console.log(obj)
    this.setState({ selection: obj });
    this.props.selection(obj)
  }

  render() {
    /*
    Important Notes:

      This.props.multi = true or false;

      this.props.options = items within the select.
      They are an array of objects as follows:
      options = [{ value: -string/number-, label: -display string- }]

      OnChange will also return current selected result back to the calling component.
      The return value is an array of objects
      return prop = this.props.selection
    */
    const options = this.props.options;
    const multi = this.props.multi;
    return (
      <div>
        <div>
          <Creatable
            multi={ multi }
            allowCreate={ true }
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
