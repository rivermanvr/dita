import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Map, Marker, Popup, TileLayer, CircleMarker } from 'react-leaflet';

class AllPostsMap extends Component {
  constructor(props){
    super(props);
  }

  render(){
    const { posts, currentView } = this.props;    
    const zoomLevel = 2;
    const position = [currentView.lat, currentView.lng]; 
    const darkTiles = 'https://api.mapbox.com/styles/v1/zakscloset/cja8rnhqp0ukm2rpjrq1uxx65/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiemFrc2Nsb3NldCIsImEiOiI0Y2Q2ZDNmNjZhYzZkMzE5Y2FjNTEwY2YxZmVjMWZiYyJ9.TN1BPlB18BT4k5-GJnWrfw';
    const tileAttr = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>';

    const stars = posts.map(post => {
      let latLng; 
      if(post.latitude && post.longitude) latLng = [post.latitude, post.longitude]
      else latLng = [0, 0]
      return { post: post, latLng: latLng }
    })

    const fillColor = 'yellow', fillOpacity = 1, strokeColor = '#000', strokeWeight = 1;
    let radius = 5 // we should change this based on our genius algorithm!! 
    const spanStyle = { fontSize: '1.5em' }

    return (
      <div className="map">
        <Map center={ position } zoom={ zoomLevel } style={{ height: "600px", width: "100%" }}>
          <TileLayer
            attribution={ tileAttr }
            url={ darkTiles }
          />
          
          <Marker position={ position }>
            <Popup>
              <div>
                <span style={ spanStyle }>You are at</span><br/>
                <span>lat: { currentView.lat } <br/>lng: { currentView.lng }</span>
              </div>
            </Popup>
          </Marker>

          {
            stars && stars.map(star => {
              return (                
                <CircleMarker key={ star.post.id } center={ star.latLng } 
                  radius={ radius } color = { strokeColor } fillColor={ fillColor } 
                  fillOpacity={ fillOpacity } weight={ strokeWeight } >
                  <Popup>
                    <div>
                      <span style={ spanStyle }>{ star.post.title }</span> <br/>
                      <span>{ star.post.body }</span>
                      </div>
                  </Popup>
                </CircleMarker>
              )
            })
          }
          
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


