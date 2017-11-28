import axios from 'axios'
import {fetchPosts} from './index'

export const addReply = (reply) => dispatch =>
  axios.post('/api/replies', reply)
    .then(res => dispatch(fetchPosts(res.data)))
    .catch(console.log)
