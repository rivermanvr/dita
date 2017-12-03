import React from 'react';
import { compose, withProps, lifecycle } from 'recompose';
import { withScriptjs } from 'react-google-maps';

const { StandaloneSearchBox } = require('react-google-maps/lib/components/places/StandaloneSearchBox');

console.log('>>>>>>>>>>>>>>>>>>', process.env)

const PlacesSearchBox = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${ process.env.GoogleAPI || require('../../../env').GoogleAPI }&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `75px` }} />
  }),
  lifecycle({
    componentWillMount() {
      const refs = {}

      this.setState({
        places: [],
        onSearchBoxMounted: ref => {
          refs.searchBox = ref;
        },
        onPlacesChanged: () => {
          const places = refs.searchBox.getPlaces();
          console.log(places)
          this.setState({
            places,
          });

          if (places.length) {
            this.props.selection && this.props.selection(places[0]);
          }
        },
      })
    },
  }),
  withScriptjs
)((props) => {
  //Commented this line so that you still have the SearchBar after selecting an address.
  //Also remember to remove the ordered list below:  lines 63 to 70
  
  return (
  <div data-standalone-searchbox="">
    <StandaloneSearchBox
      ref={props.onSearchBoxMounted}
      bounds={props.bounds}
      onPlacesChanged={props.onPlacesChanged}>
      <input
        type="text"
        placeholder="Enter a location/address..."
        className='textbox'
      />
    </StandaloneSearchBox>
    {/* <ol>
      {props.places.map(({ place_id, formatted_address, geometry: { location } }) =>
        <li key={place_id}>
          {formatted_address}		
          {" at "}
          ({location.lat()}, {location.lng()})
        </li>
      )}
    </ol> */}
  </div>
  )});

export default PlacesSearchBox;
