import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { Map, Marker, Popup, TileLayer, CircleMarker } from 'react-leaflet';
import Replies from './Replies'
import * as d3 from 'd3';
import { setModal, setActivePost } from '../../actions'
import Modal from '../reusables/Modal'
import PostDetail from './PostDetail'
import { isEmpty } from 'lodash'

const findMaxGrid = (grid, zoom) => {
  let gridKey = Object.keys(grid).reduce((f, k) => {
    return k <= zoom && k > f ? k : f
  }, 0)
  return grid[gridKey] && grid[gridKey].nodes || []
}

class AllPostsMap extends Component {
  state = {
    isVisible: false,
    zoomLevel: 5
  }

  changeRadius = zoomLevel => {
    this.setState({ zoomLevel })
  }
  handleModal = post => {
    this.props.setActivePost(post)
    this.props.toggleModal()
  }
  handleUserDashboard = post => {
    this.props.history.push(`/userdashboard/${post.userId}/storylines`)
  }
  
  render = () => {
    const { posts, currentView, modal } = this.props;
    const { isVisible, zoomLevel, postDetail } = this.state;
    const grid = findMaxGrid(this.props.grid, zoomLevel);
    const position = [currentView.lat, currentView.lng]; 
    const darkTiles = 'https://api.mapbox.com/styles/v1/zakscloset/cja8rnhqp0ukm2rpjrq1uxx65/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiemFrc2Nsb3NldCIsImEiOiI0Y2Q2ZDNmNjZhYzZkMzE5Y2FjNTEwY2YxZmVjMWZiYyJ9.TN1BPlB18BT4k5-GJnWrfw';
    const tileAttr = '&copy; <a href="https://www.mapbox.com/">Mapbox</a>';
    posts.forEach(d => {
      d.latLng = new L.LatLng(d.latitude, d.longitude);
    })
    grid.forEach(d => {
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
                  <span style={ spanStyle }>You are at</span>
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
                        <h4 style={ spanStyle } onClick={ () => this.handleModal(post) }>{ post.title }</h4>
                        <span>{ post.body }</span>
                        <div className='leaflet-popup-footer'>
                          <p data-post={post} onClick={() => this.handleModal(post)}>Full Story</p>
                          <p data-post={post} onClick={() => this.handleUserDashboard(post)}>More by user</p>
                        </div>
                      </div> 
                    </Popup>                  
                    <CircleMarker center={ [post.latLng.lat, post.latLng.lng] } 
                      radius={ Math.sqrt(post.halflife / 2) + zoomLevel } 
                      className={ `halflife halflife-core hl-${Math.ceil(post.halflife)}` }
                      weight={ 0 }></CircleMarker>
                  </CircleMarker>               
                )
              }) :
              grid && grid.map(post => {
                let halflife = post.verticeData ? post.verticeData.averageHl : post.halflife
                return (                
                  <CircleMarker key={ post.id } center={ [post.latLng.lat, post.latLng.lng] } 
                    radius={ Math.sqrt(halflife / 2) + zoomLevel }  fillColor={ 'transparent' } 
                    className={ `halflife halflife-outline hl-${Math.ceil(halflife)}` }
                    weight={ 1 }>
                    {/*<Popup className={ post.verticeData ? 'cluster-popup' : '' }>*/}
                    <Popup>
                    {
                      post.verticeData ?
                      <div className='cluster-popup-inner'>
                        <a style={ spanStyle }>{ post.verticeData.count + 1 } posts</a>
                      </div> :
                      <div>
                        <h4 style={ spanStyle } onClick={ () => this.handleModal(post) }>{ post.title }</h4>
                        <span>{ post.body }</span>
                        <div className='leaflet-popup-footer'>
                          <p data-post={post} onClick={() => this.handleModal(post)}>Full Story</p>
                          <p data-post={post} onClick={() => this.handleUserDashboard(post)}>More by user</p>
                        </div>
                      </div>
                    }
                    </Popup>                  
                    <CircleMarker center={ [post.latLng.lat, post.latLng.lng] } 
                      radius={ Math.sqrt(halflife / 2) + zoomLevel } 
                      className={ `halflife halflife-core hl-${Math.ceil(halflife)}` }
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
          modal ? <Modal isActive={modal}><PostDetail /></Modal> : <div></div>
        }

      </div>
    )
  }  
}


const mapStateToProps = ({ posts, currentView, grid, modal }) => {
  return {
    posts, currentView, modal, grid
  }
}

const mapDispatchToProps = dispatch => {
  return {
    toggleModal() {
      dispatch(setModal());
    },
    setActivePost(post) {
      dispatch(setActivePost(post))
    }
  }
}

export default connect (mapStateToProps, mapDispatchToProps)(AllPostsMap)
