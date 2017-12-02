import React, {Component} from 'react'
import {connect} from 'react-redux'
import {changeActiveModal} from '../../actions'

class Modal extends Component{
    constructor(props){
        super(props)
        this.closeModal = this.closeModal.bind(this)
    }
    componentWillReceiveProps(newProps) {
        if(newProps.modal){
            document.addEventListener('click', this.handleOutsideClick,false)
        }
    }
    closeModal = () => {
        document.removeEventListener('click', this.handleOutsideClick,false)
        this.props.toggleModal()
    }
    handleOutsideClick = (e) => {
        if(this.node.contains(e.target)){
            return
        }
        console.log('hey')
        this.closeModal()
    }
    render(){
        const {children, isActive} = this.props
        return (
            <div className={`modalWrapper ${isActive ? '' : 'modalHidden'}`}>
                <div className="modalContents" ref={node => { this.node = node; }}>
                    {children}
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({modal}) => {
    return {modal}
}

const mapDispatchToProps = (dispatch) => {
    return {
      toggleModal: () => {
        dispatch(changeActiveModal());
      }
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(Modal)
