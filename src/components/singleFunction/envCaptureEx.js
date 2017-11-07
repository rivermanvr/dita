import React, { Component } from 'react';

export default class GeoInput extends Component {
  constructor() {
    super();
    this.state = { term: '', keyAPI: '' };

    this.onInputChange = this.onInputChange.bind(this);
  }

  componentDidMount() {
    if (!this.state.keyAPI) {
      // retrieving our Google API key from a secure place.
      const key = process.env.GoogleAPI || require('../../../env').GoogleAPI;
      this.setState({ keyAPI: key });
    }
  }

  onInputChange(event) {
    console.log(event.target.value)
    this.setState({ term: event.target.value });
    this.props.selection(event.target.value)
  }

  render() {
    /*
    Important Notes:
      OnChange will also return current selected result back to the calling component.
      The return value is .....TBD...........
      return prop = this.props.selection
    */
    console.log('googleTest - this.state: ', this.state);
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
