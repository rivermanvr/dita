import React, { Component } from 'react'
import { connect } from 'react-redux'
import SearchMap from './geoLocator'
import { setLocationFromGeoLoc } from '../../actions'
const FontAwesome = require('react-fontawesome');

class ChangeView extends Component {
    constructor(){
        super()
        this.state = {
            place: {}
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.selection = this.selection.bind(this)
    }
    handleSubmit = (e) => {
        e.preventDefault()
        this.props.setCurrentView(this.state.place)
        if(this.props.viewSelected) {
            this.props.viewSelected()
        }
    }
    selection = place => {
        this.setState({ place })
    }
    render(){
        return (
            <div className="searchMap">
               <form onSubmit={this.handleSubmit}>
                <SearchMap selection={this.selection}/>
                <FontAwesome name='search' onClick={this.handleSubmit} />
               </form>
            </div>
        )
    }
}

const mapStateToProps = ({currentView}) => {
   return currentView
}

const mapDispatchToProps = (dispatch) => {
    return {
        setCurrentView: (place) => {
            dispatch(setLocationFromGeoLoc(place));
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ChangeView)