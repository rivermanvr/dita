const router = require('express').Router()
const { User, Post } = require('../db').models
const { verifyToken } = require('./authMiddleware')

router.get('/myposts', verifyToken, (req, res, next) => {
  Post.findPosts(req.user.id)
    .then(posts => res.send(posts))
})

router.post('/', (req, res, next) => {
  Post.create(req.body)
    .then(() => res.sendStatus(204))
    .catch(next);
})

router.get('/allposts', (req, res, next) => {
  Post.findAll()
    .then(data => {
      res.send(data)
    })
    .catch(next);
})


module.exports = router