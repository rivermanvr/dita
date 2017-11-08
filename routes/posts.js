const router = require('express').Router()
const { User, Post, StoryLine, Reply } = require('../db').models
const { verifyToken } = require('./authMiddleware')

// router.get('/myposts', verifyToken, (req, res, next) => {
//   Post.findPosts(req.user.id)
//     .then(posts => res.send(posts))
// })

router.get('/myposts', verifyToken, (req, res, next) => {
  Post.findPostsWithReplies(req.user.id)
    .then(posts => {
      res.send(posts)
    })
})

router.post('/', (req, res, next) => {
  Post.create(req.body)
    .then(() => res.sendStatus(204))
    .catch(next);
})

router.get('/', (req, res, next) => {
  Post.findAll({ include: [{ model: StoryLine }, { model: Reply, include: [ User ]}] })
    .then(data => {
      res.send(data)
    })
    .catch(next);
})


module.exports = router


