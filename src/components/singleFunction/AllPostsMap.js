import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { Map, Marker, Popup, TileLayer, CircleMarker } from 'react-leaflet';
import Replies from './Replies'
import * as d3 from 'd3';
import {changeActiveModal} from '../../actions'
import Modal from '../reusables/Modal'
import PostDetail from './PostDetail'
import { isEmpty } from 'lodash'


class AllPostsMap extends Component {
  state = {
    isVisible: false,
    zoomLevel: 9,
    postDetail: null
  }

  changeRadius = zoomLevel => {
    console.log(zoomLevel)
    this.setState({ zoomLevel })
  }
  handleModal = content => {
    this.setState({
      postDetail: content
    },()=>this.props.toggleModal())
  }
  handleUserDashboard = post => {
    this.props.history.push(`/userdashboard/${post.userId}/storylines`)
  }

  handleRegionZoom = e => {
    console.log(e.latlng.lat)
    console.log('click!')
    // this.props.setCurrentLocation({
    //   lat: e.latlng.lat,
    //   lng: e.latlng.lng
    // })
    // setTimeout(() => {
    //   this.setState({ zoomLevel: 6 })
    // }, 300)
  }

  render = () => {
    const { posts, currentView, grid4, grid3, modal } = this.props;
    const { isVisible, zoomLevel, postDetail } = this.state;
    const position = [currentView.lat, currentView.lng]; 
    const darkTiles = 'https://api.mapbox.com/styles/v1/zakscloset/cja8rnhqp0ukm2rpjrq1uxx65/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiemFrc2Nsb3NldCIsImEiOiI0Y2Q2ZDNmNjZhYzZkMzE5Y2FjNTEwY2YxZmVjMWZiYyJ9.TN1BPlB18BT4k5-GJnWrfw';
    const tileAttr = '&copy; <a href="https://www.mapbox.com/">Mapbox</a>';
    posts.forEach(d => {
      d.latLng = new L.LatLng(d.latitude, d.longitude);
    })

    const fillColor = 'red', fillOpacity = 0.7, strokeColor = '#fff', strokeWeight = 1;
    const spanStyle = { fontSize: '1.5em' }
  
    return (
      <div className='map-container'>
        <Map
          center={ position }
          zoom={ zoomLevel }
          style={{ height: "calc(100vh - 34px)", width: "100%" }}
          className='map'
          worldCopyJump="true" zoomControl={ false }
          onViewportChanged={
            (view) => {
              this.changeRadius(view.zoom)
            }
          }>
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
              zoomLevel > 7 ?
              posts && posts.map(post => {
                return (                
                  <CircleMarker key={ post.id } center={ [post.latLng.lat, post.latLng.lng] } 
                    radius={ Math.sqrt(post.halflife / 2) + zoomLevel }  fillColor={ 'transparent' } 
                    className={ `halflife halflife-outline hl-${Math.ceil(post.halflife)}` }
                    weight={ 1 }>
                    <Popup>
                      <div>
                        <a style={ spanStyle } href={`/posts/${post.id}`}>{ post.title }</a> <br/>
                        <span>{ post.body }</span>
                        <p data-post={post} onClick={() => this.handleModal(post)}>View Detail</p>
                        <p data-post={post} onClick={() => this.handleUserDashboard(post)}>View Dash</p>
                      </div> 
                    </Popup>                  
                    <CircleMarker center={ [post.latLng.lat, post.latLng.lng] } 
                      radius={ Math.sqrt(post.halflife / 2) + zoomLevel } 
                      className={ `halflife halflife-core hl-${Math.ceil(post.halflife)}` }
                      weight={ 0 }></CircleMarker>
                  </CircleMarker>               
                )
              }) :
              zoomLevel < 4 ?
              grid3 && grid3.map((zone, i) => {
                return (                
                  <CircleMarker key={ i } center={ [zone.lat, zone.lng] }
                    radius={ Math.sqrt(zone.halflife / 2) + 3 }  fillColor={ 'transparent' } 
                    className={ `halflife halflife-outline hl-${zone.halflife}` }
                    onClick={ this.handleRegionZoom }
                    weight={ 1 }>
                    <Popup>
                      <div>
                        <span>{ `${zone.count}, ${zone.lat}, ${zone.lng}, ${zone.halflife}` } for debugging</span>
                      </div> 
                    </Popup>
                    <CircleMarker center={ [zone.lat, zone.lng] } 
                      radius={ Math.sqrt(zone.halflife / 2) + 3 } 
                      className={ `halflife halflife-core hl-${zone.halflife}` }
                      weight={ 0 }></CircleMarker>
                  </CircleMarker>
                )
              }) :
              grid4 && grid4.map((zone, i) => {
                return (                
                  <CircleMarker key={ i } center={ [zone.lat, zone.lng] }
                    radius={ Math.sqrt(zone.halflife / 2) + 3 }  fillColor={ 'transparent' } 
                    className={ `halflife halflife-outline hl-${zone.halflife}` }
                    onClick={ this.handleRegionZoom }
                    weight={ 1 }>
                    <Popup>
                      <div>
                        <span>{ `${zone.count}, ${zone.lat}, ${zone.lng}, ${zone.halflife}` } for debugging</span>
                      </div> 
                    </Popup>
                    <CircleMarker center={ [zone.lat, zone.lng] } 
                      radius={ Math.sqrt(zone.halflife / 2) + 3 } 
                      className={ `halflife halflife-core hl-${zone.halflife}` }
                      weight={ 0 }></CircleMarker>
                  </CircleMarker>
                )
              })
            }
        </Map>

        <div className='legend-bar'>
          <span className='legend-container'><span className='legend-circle hl100'></span>Trending</span>
          <span className='legend-container'><span className='legend-circle hl50'></span>New!</span>
          <span className='legend-container'><span className='legend-circle hl25'></span>Fading</span>
          <span className='legend-container'><span className='legend-circle hl0'></span>Shrinking</span>
        </div>

        {
          modal ? <Modal isActive={modal}><PostDetail post={postDetail} /></Modal> : <div></div>
        }

      </div>
    )
  }  
}


const mapStateToProps = ({ posts, currentView, grid, modal }) => {
  return {
    posts, currentView, modal,
    grid4: Object.keys(grid.zoomMid)
            .map(key => ({
              // center of each grid
              lat: +key.split(',')[0] + Math.random() * 0.2,
              lng: +key.split(',')[1] + Math.random() * 0.5,
              halflife: Math.ceil(grid.zoomMid[key].averageHl),
              count: grid.zoomMid[key].count
            })),
    grid3: Object.keys(grid.zoomHigh)
            .map(key => ({
              // center of each grid
              lat: +key.split(',')[0] + 0.5 + Math.random() * 0.3 + 0.1,
              lng: +key.split(',')[1] + 1 + Math.random() * 0.5 + 0.2,
              halflife: Math.ceil(grid.zoomHigh[key].averageHl),
              count: grid.zoomHigh[key].count
            }))
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleModal: () => {
      dispatch(changeActiveModal());
    }
  }
}

export default connect (mapStateToProps, mapDispatchToProps)(AllPostsMap)
