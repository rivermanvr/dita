import React, {Component} from 'react'
import Modal from '../reusables/Modal'
import { connect } from 'react-redux';
import {changeActiveModal} from '../../actions'

class TestModal extends Component {
    constructor(props){
        super(props)
        this.handleModal = this.handleModal.bind(this)
    }
    handleModal = () => {
        console.log(this.props.toggleModal)
        this.props.toggleModal()
    }
    render(){
        const {modal} = this.props
        return (
            <div>
                <Modal isActive={modal} >
                    <h1 style={{padding:'18px'}}>hey</h1>
                </Modal>
                <button onClick={this.handleModal}>Click Me</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(TestModal)