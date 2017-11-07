const router = require('express').Router()
const { User, Post } = require('../db').models
const { verifyToken } = require('./authMiddleware')

// fake posts
const posts = [
  { id: 1, createdAt: '10/2/17', title:'Today was great!', body:'just a random summary of my great day mayng', zip:'10028', userId: 1},
  { id: 2, createdAt: '5/16/17', title:'Today was solid!', body:'just a random summary of my solid day mayng', zip:'10027', userId: 1},
  { id: 3, createdAt: '1/2/16', title:'Today was amazing!', body:'just a random summary of my amazing day mayng', zip:'10026', userId: 2},
  { id: 4, createdAt: '6/11/16', title:'Tonight was dope!', body:'just a random summary of my dope night mayng', zip:'10025', userId: 3},
  { id: 5, createdAt: '3/4/17', title:'Tonight was bonkers!', body:'just a random summary of my bonkers night mayng', zip:'10024', userId: 2},
  { id: 6, createdAt: '8/8/16', title:'Today was wild!', body:'just a random summary of my wild day mayng', zip:'10023', userId: 3},
  { id: 7, createdAt: '3/3/17', title:'This morning was insane!', body:'just a random summary of my insane morning mayng', zip:'10022', userId: 4}
]

router.get('/myposts', verifyToken, (req, res, next) => {
  res.send(posts.filter(p => p.userId == req.user.id))
})

router.post('/', (req, res, next) => {
  Post.create(req.body)
    .then(() => res.sendStatus(204))
    .catch(next);
})

router.get('/', (req, res, next) => {
  Post.findAll()
    .then(data => {
      res.send(data)
    })
    .catch(next);
})

module.exports = router