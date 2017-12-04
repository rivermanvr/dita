import React, {Component} from 'react'
import {connect} from 'react-redux'
import {changeActiveModal} from '../../actions'

class Modal extends Component{
    constructor(props){
        super(props)
        this.state = {
            content: ''
        }
        this.closeModal = this.closeModal.bind(this)
    }
    componentDidMount(){
        this.setState({
            content: this.props.children,
            active: this.props.isActive
        })
        document.addEventListener('click', this.handleOutsideClick,false)  
        window.setTimeout(()=> this.toggleShow.classList.remove('modalHidden'),0)      
    }
    componentWillReceiveProps(newProps) {
        if(newProps.modal){
            document.addEventListener('click', this.handleOutsideClick,false)
        }
        this.setState({
            content: newProps.children
        })
        window.setTimeout(()=> this.toggleShow.classList.remove('modalHidden'),0)              
    }
    closeModal = () => {
        document.removeEventListener('click', this.handleOutsideClick,false)
        console.log('hey')
        this.toggleShow.classList.add('modalHidden')                   
        window.setTimeout(()=> this.props.toggleModal(), 350)
    }
    handleOutsideClick = (e) => {
        if(this.node.contains(e.target)){
            return
        }
        this.closeModal()
    }
    componentWillUnmount = () => {
        document.removeEventListener('click', this.handleOutsideClick,false)        
    }
    render(){
        const {children, isActive} = this.props
        const {content, active} = this.state
        return (
            <div className='modalWrapper modalHidden' ref={node => { this.toggleShow = node; }}>
                <div className="modalContents" ref={node => { this.node = node; }}>
                    {content}
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
