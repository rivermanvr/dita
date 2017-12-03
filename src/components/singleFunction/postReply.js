import React, {Component, isValidElement} from 'react'
import { addReply, recordMetrics } from '../../actions';
import {connect} from 'react-redux'
const FontAwesome = require('react-fontawesome');

class PostReply extends Component{
    constructor(props){
        super()
        this.state = {
            body: '',
            postId: '',
            userId:'',
            showReplies: ''
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }
    componentDidMount(){
      let loggedIn 
      if(!this.props.currentUser.isAuthenticated){
        loggedIn = false
      }
      else {
          loggedIn = true
      }
       this.setState({
            userId: this.props.currentUser.user.id,
            postId: this.props.postId,
            showReplies: loggedIn
        })
    }
    componentWillReceiveProps(newProps){
        let loggedIn 
        if(!newProps.currentUser.isAuthenticated){
            loggedIn = false
        }
        else {
            loggedIn = true
        }
        this.setState({
            userId: newProps.currentUser.user.id,
            postId: newProps.postId,
            showReplies: loggedIn
        })
    }
    onChange(e){
        this.setState({
            body: e.target.value
        })
    }
    onSubmit(e){
        e.preventDefault()
        const post = {
            body: this.state.body,
            postId: this.state.postId,
            userId: this.state.userId
        }
        this.props.handleAdd(post)
        this.setState({
            body:''
        })
    }
    render(){
        const {post} = this.props
        const {body, showReplies} = this.state
        return (
           <div>
           {showReplies && <form className="replyForm" onSubmit={this.onSubmit}>
                <input value={body} placeholder={post && `Reply to ${post.user.name}` } className='replyInput' type="text" onChange={this.onChange}/>
                <i className='ion-android-send'></i>         
            </form>
            }
            </div>
        )
    }
}

const mapStateToProps = ({currentUser}, props) => {
    return {
        currentUser,
        postId: props.post ? props.post.id : ''
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
      handleAdd: (reply) => {
        dispatch(addReply(reply));
        const { userId, postId } = reply
        dispatch(recordMetrics(postId, { userId: +userId, type: 'REPLY' }))
      }
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(PostReply)