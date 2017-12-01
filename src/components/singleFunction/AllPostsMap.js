import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { Map, Marker, Popup, TileLayer, CircleMarker } from 'react-leaflet';
import Replies from './Replies'
import * as d3 from 'd3';


class AllPostsMap extends Component {
  constructor(props){
    super(props);
  }

  render(){
    const { posts, currentView } = this.props;    
    const zoomLevel = 3;
    const position = [currentView.lat, currentView.lng]; 
    const darkTiles = 'https://api.mapbox.com/styles/v1/zakscloset/cja8rnhqp0ukm2rpjrq1uxx65/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiemFrc2Nsb3NldCIsImEiOiI0Y2Q2ZDNmNjZhYzZkMzE5Y2FjNTEwY2YxZmVjMWZiYyJ9.TN1BPlB18BT4k5-GJnWrfw';
    const tileAttr = '&copy; <a href="https://www.mapbox.com/">Mapbox</a>';

    posts.forEach(d => {
      d.latLng = new L.LatLng(d.latitude, d.longitude);
    })

    const fillColor = '#f9e359', fillOpacity = 0.7, strokeColor = '#fff', strokeWeight = 1;
    const spanStyle = { fontSize: '1.5em' }
  
    return (
      <div>
        <Map center={ position } zoom={ zoomLevel } style={{ height: "100vh", width: "100%" }} worldCopyJump="true" zoomControl={ false } >
            <TileLayer
              attribution={ tileAttr }
              url={ darkTiles }
            />
            
            <Marker position={ position }>
              <Popup>
                <div>
                  <span style={ spanStyle }>You are at</span><br/>
                  <span>{ currentView.address }</span>
                </div>
              </Popup>
            </Marker>
           
            {
              posts && posts.map(post => {
                return (                
                  <CircleMarker key={ post.id } center={ [post.latLng.lat, post.latLng.lng] } 
                    radius={ post.halflife / 7 } color={ strokeColor } fillColor={ fillColor } 
                    fillOpacity={ fillOpacity } weight={ strokeWeight }>
                    <Popup>
                      <div>
                        <a style={ spanStyle } href={`/posts/${post.id}`}>{ post.title }</a> <br/>
                        <span>{ post.body }</span>
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


