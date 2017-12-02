import React, { Component } from 'react'
import { connect } from 'react-redux'
import ChangeView from '../singleFunction/changeView'
import { setLocationFromGeoLoc } from '../../actions'
//add on finish method which then switches to map view. on finish is called only when url is '/'

class Home extends Component {
    constructor(){
        super()
        this.viewSelected = this.viewSelected.bind(this)
    }
    viewSelected = () => {
        this.props.history.push("/map");    
    }
    render(){
        return (
            <section className='homePage'>
              <div className="hero">
                <div className="heroContent">
                    <h1>Dreams. Ideas. Thoughts. Actions.</h1>
                    <div className="locationCont">
                        <ChangeView  viewSelected={this.viewSelected}/>
                    </div>
                </div>
              </div>
            </section>
        )
    }
}

export default connect()(Home)