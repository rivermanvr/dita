import React, { Component } from 'react';

export default class GeoInput extends Component {
  constructor() {
    super();
    this.state = { keyAPI: '' };

  }

  //Illustration of pulling secure data from process.env variable or env.json file
  // Keep for reference  - Vince Rios

  componentDidMount() {
    if (!this.state.keyAPI) {
      // retrieving our Google API key from a secure place.
      const key = process.env.GoogleAPI || require('../../../env').GoogleAPI;
      this.setState({ keyAPI: key });
    }
  }

  render() {
    /*
    Important Notes:
      OnChange will also return current selected result back to the calling component.
      The return value is .....TBD...........
      return prop = this.props.selection
    */
    console.log('retrieve from env.json - this.state: ', this.state);
    return (
      <div>
        nothing here.....
      </div>
    )
  }
}
