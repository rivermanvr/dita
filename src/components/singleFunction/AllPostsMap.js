import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { Map, Marker, Popup, TileLayer, CircleMarker } from 'react-leaflet';
import Replies from './Replies'
import * as d3 from 'd3';
import { changeActiveModal, setCurrentLocation } from '../../actions'
import Modal from '../reusables/Modal'
import PostDetail from './PostDetail'
import { isEmpty } from 'lodash'


class AllPostsMap extends Component {
  state = {
    isVisible: false,
    zoomLevel: 5,
    postDetail: null
  }

  changeRadius = zoomLevel => {
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

  handleRegionZoom = (lat, lng) => {
    console.log(lat, lng)
    console.log('click!')
    // this.props.setCurrentLocation({
    //   lat: lat,
    //   lng: lng
    // })
    // setTimeout(() => {
    //   this.setState({ zoomLevel: 9 })
    // }, 800)
  }

  render = () => {
    const { posts, currentView, modal } = this.props;
    const { isVisible, zoomLevel, postDetail } = this.state;
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
                        <a style={ spanStyle } onClick={ () => this.handleRegionZoom(post.latitude, post.longitude) }>{ post.verticeData.count } posts</a>
                        {/*<a style={ spanStyle } href={`/posts/${post.id}`}>{ post.title }</a> <br/>
                        <span>{ post.body }</span>
                        <p data-post={post} onClick={() => this.handleModal(post)}>View Detail</p>
                        <p data-post={post} onClick={() => this.handleUserDashboard(post)}>View Dash</p>*/}
                      </div> :
                      <div>
                        <a style={ spanStyle } href={`/posts/${post.id}`}>{ post.title }</a> <br/>
                        <span>{ post.body }</span>
                        <p data-post={post} onClick={() => this.handleModal(post)}>View Detail</p>
                        <p data-post={post} onClick={() => this.handleUserDashboard(post)}>View Dash</p>
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
          modal ? <Modal isActive={modal}><PostDetail post={postDetail} /></Modal> : <div></div>
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

const mapDispatchToProps = (dispatch) => {
  return {
    toggleModal: () => {
      dispatch(changeActiveModal());
    },
    setCurrentLocation
  }
}

export default connect (mapStateToProps, mapDispatchToProps)(AllPostsMap)
