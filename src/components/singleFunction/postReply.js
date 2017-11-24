import React, {Component, isValidElement} from 'react'
import { addReply } from '../../actions';
import {connect} from 'react-redux'
const FontAwesome = require('react-fontawesome');

class PostReply extends Component{
    constructor(props){
        super()
        this.state = {
            body: '',
            postId: '',
            userId:''
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }
    componentDidMount(){
       this.setState({
            userId: this.props.currentUser.user.id,
            postId: this.props.postId
        },()=>console.log(this.state))
    }
    onChange(e){
        this.setState({
            body: e.target.value
        })
    }
    onSubmit(){
        this.props.handleAdd(this.state)
        this.setState({
            body:''
        })
    }
    render(){
        const {post} = this.props
        const {body} = this.state
        console.log(post)
        return(
           <div className="replyForm">
             <input value={body} placeholder={`Reply to ${post.user.name}`} className='replyInput' type="text" onChange={this.onChange}/>
             <FontAwesome name='paper-plane' onClick={this.onSubmit}/>           
             </div>
        )
    }
}

const mapStateToProps = ({currentUser}, props) => {
    return {
        currentUser,
        postId: props.post.id
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
      handleAdd: (reply) => {
        dispatch(addReply(reply));
      }
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(PostReply)