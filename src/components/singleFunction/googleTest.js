import React from "react"
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

const MyMapComponent = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${ process.env.GoogleAPI || require('../../../env').GoogleAPI }&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `75px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
    mapTypeId: 'satellite'
  }),
  withScriptjs,
  withGoogleMap
)((props) =>
  <GoogleMap
    defaultZoom={1}
    defaultCenter={{ lat: 40.8777896, lng: -74.1875282 }}
  >
    {props.isMarkerShown && <Marker position={{ lat: 40.8777896, lng: -74.1875282 }} onClick={props.onMarkerClick} />}
  </GoogleMap>
)

class GeoLoc extends React.PureComponent {
  constructor() {
    super();
    this.state = { isMarkerShown: false };
  }

  componentDidMount() {
    this.delayedShowMarker()
  }

  delayedShowMarker() {
    setTimeout(() => {
      this.setState({ isMarkerShown: false })
    }, 3000)
  }

  handleMarkerClick() {
    this.setState({ isMarkerShown: false })
    this.delayedShowMarker()
  }

  render() {
    return (
      <MyMapComponent
        isMarkerShown={this.state.isMarkerShown}
        onMarkerClick={this.handleMarkerClick}
      />
    )
  }
}

export default GeoLoc;
