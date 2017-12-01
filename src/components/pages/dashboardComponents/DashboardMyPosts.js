import React from 'react'
import { connect } from 'react-redux'
import * as d3 from 'd3'
import { Link } from 'react-router-dom'
import Replies from '../../singleFunction/Replies'

export const xPostCard = ({ content }) => {
  if (!content) return <div></div>

  const {
    createdAt,
    title,
    body,
    storyline,
    replies,
    id
  } = content

  return (
    <div>
      <h4>
        <Link to={ `/posts/${ id }`} >
          { title }
        </Link>
        <small>from story <span style={{fontSize:'16px', textTransform:'capitalize'}}>{ storyline && storyline.title }</span></small>
      </h4>
      
      <p>{ body }</p>
      <h5>Replies:</h5>
      <Replies postId={id} />
      <small>{ d3.timeFormat('%m/%d/%y')(new Date(createdAt)) }</small>
    </div>
  )
}

const Posts = ({ userPosts, pathname }) => {
  // blank for now, will do all posts otherwise
  const posts = pathname == '/dashboard/myposts' ? userPosts : []

  return (
    <div className='dashboard-item'>
      <h3 className='dashboard-header'>My Posts</h3>

      <div className='post-cards-container'>
      { userPosts && userPosts.map(post => {
        let title = (post.title || post.body).slice(0, 30)
        return <div key={ post.id } className='post-card'>
          <div className='post-card-header'>
            <h4>{ `${title}${title.length > 30 ? '...' : ''}` }</h4>
            <span className={ `trending-status hl-${Math.ceil(post.halflife)}` }></span>
          </div>

          <div className='post-card-body'>
            <p>{ post.body }</p>
          </div>

          <div className='post-card-footer'>
            <span>{ d3.timeFormat('%m/%d/%y')(new Date(post.createdAt)) }</span>
            <span className='replies-count-container'><i className='ion-ios-chatboxes-outline'></i> <span className='replies-count'>{ post.replies.length }</span></span>
            <span onClick={ () => console.log('open modal') } className='more'><i className='ion-ios-more-outline'></i></span>
          </div>
        </div>
      })}
      </div>
    </div>
  )
}

const mapState = ({ userPosts }, ownProps) => (
  { 
    userPosts,
    pathname: ownProps.location.pathname
  }
)

export default connect(mapState)(Posts)