import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as d3 from 'd3'
import { Link } from 'react-router-dom';
import { Map, Marker, Popup, TileLayer, CircleMarker } from 'react-leaflet';

const Analytics = ({ userPosts, currentView, posts, users, allLocations}) => {
  const visitorIds = []
  userPosts.forEach(post => {
    post.visitedBy.forEach(id => {
      visitorIds.push(id)
    })
  })
  
  const visitorLocations = allLocations.filter(location => {
    return visitorIds.indexOf(location.userId) >= 0
  })

  const position = [currentView.lat, currentView.lng]; 
  const zoomLevel = 2;
  const lightTiles = 'https://api.mapbox.com/styles/v1/zakscloset/cjashujysj8qv2rl84giqd1tb/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiemFrc2Nsb3NldCIsImEiOiI0Y2Q2ZDNmNjZhYzZkMzE5Y2FjNTEwY2YxZmVjMWZiYyJ9.TN1BPlB18BT4k5-GJnWrfw';
  const tileAttr = '&copy; <a href="https://www.mapbox.com/">Mapbox</a>';
  visitorLocations.forEach(d => {
    d.latLng = new L.LatLng(d.lat, d.lng);
  })

  const fillColor = 'yellow', fillOpacity = 1, strokeColor = '#fff', strokeWeight = 0;
  const spanStyle = { fontSize: '1.5em' }
  const radius = 10

  return (
    <div className='dashboard-item'>
      <h3>Your visitors</h3>
      <p>Your post visitors are from these locations</p>
      <div>
        <Map
          center={ position }
          zoom={ zoomLevel }
          style={{ height: "calc(100vh/2)", width: "100%" }}          
          worldCopyJump="true" zoomControl={ false }>
            
            <TileLayer
              attribution={ tileAttr }
              url={ lightTiles }
            />
            
            <Marker position={ position }>
              <Popup>
                <div>
                  <span style={ spanStyle }>Your Location</span><br/>
                  <span>{ currentView.address }</span>
                </div>
              </Popup>
            </Marker>

            {
              visitorLocations && visitorLocations.map(visitor => {
                return(
                  <CircleMarker key={ visitor.id } center={ [visitor.latLng.lat, visitor.latLng.lng] }
                    radius={ radius } fillColor={ fillColor }>
                    <Popup>
                      <div>
                        <span>{ visitor.address }</span>
                      </div>
                    </Popup>
                  </CircleMarker>
                )
              })
            }
        </Map>


      </div>


    </div>
    )


}

const mapStateToProps = ({ userPosts, currentView, posts, users, allLocations }) => {
  return {
    userPosts, 
    currentView,
    posts, 
    users,
    allLocations
  } 
}


export default connect(mapStateToProps)(Analytics)