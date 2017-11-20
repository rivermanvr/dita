import React, { Component } from 'react';
import { connect } from 'react-redux';
import GeoLoc from './geoMapDisplay';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';

class AllPostsMap extends Component {
  constructor(props){
    super(props);
  }

  render(){
    const { posts, currentView } = this.props;    
    const zoomLevel = 2;
    const position = [currentView.lat, currentView.lng];
    const darkTiles = 'https://api.mapbox.com/styles/v1/zakscloset/cja04we4b96b22sphpuhp5xil/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiemFrc2Nsb3NldCIsImEiOiI0Y2Q2ZDNmNjZhYzZkMzE5Y2FjNTEwY2YxZmVjMWZiYyJ9.TN1BPlB18BT4k5-GJnWrfw'
    const tileAttr = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>';
    
    return (
      <div>
        <Map center={ position } zoom={ zoomLevel } style={{ height: "600px", width: "100%" }}>
          <TileLayer
            attribution={ tileAttr }
            url={ darkTiles }
          />
          <Marker position={ position }>
            <Popup>
              <span>lat: { currentView.lat } <br/>lng: { currentView.lng }</span>
            </Popup>
          </Marker>
        </Map>
      </div>
    )
  }  
}

const mapStateToProps = ({ posts, currentView }) => {
  return {
    posts, currentView
  }
}

export default connect (mapStateToProps)(AllPostsMap)