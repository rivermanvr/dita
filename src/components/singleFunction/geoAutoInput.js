import React, { Component } from 'react';

export default class SelectMulti extends Component {
  constructor() {
    super();
    this.state = { term: '' };

    this.onInputChange = this.onInputChange.bind(this);
  }

  onInputChange(event) {
    console.log(event.target.value)
    this.setState({ term: event.target.value });
    this.props.selection(event.target.value)
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
    return (
      <div>
        <div>
          <input
            name="form-field-input"
            className="colWidth100"
            placeholder="enter a location..."
            value={ this.state.term }
            onChange={ this.onInputChange }
          />
        </div>
      </div>
    )
  }
}
