const router = require('express').Router()
const { User, Post, StoryLine, Reply } = require('../db').models
const { verifyToken } = require('./authMiddleware')

// router.get('/myposts', verifyToken, (req, res, next) => {
//   Post.findPosts(req.user.id)
//     .then(posts => res.send(posts))
// })

router.post('/myposts/withstories', verifyToken, (req, res, next) => {
  const { storyData, postData } = req.body
  Object.assign(storyData, { userId: req.user.id })
  Object.assign(postData, { userId: req.user.id })
  StoryLine.create(storyData)
    .then(storyline => {
      Object.assign(postData, { storylineId: storyline.id })
      return Post.create(postData)
    })
    .then(post => res.send(200))
    .catch(next)
})

router.get('/myposts', verifyToken, (req, res, next) => {
  Post.findPostsWithReplies(req.user.id)
    .then(posts => {
      res.send(posts)
    })
    .catch(next)
    
})

router.post('/myposts', verifyToken, (req, res, next) => {
  Object.assign(req.body, { userId: req.user.id })
  Post.create(req.body)
    .then(post => res.send(post))
    .catch(next);
})

router.get('/', (req, res, next) => {
  Post.findAll({ include: [{ model: StoryLine, include:[{model:Post, order:[['createdAt', 'DESC']]}] }, {model: User}, { model: Reply, include: [ User ]}] })
    .then(posts => res.send(posts))
    .catch(next);
})

router.get('/:id', (req, res, next) => {
  Post.findById(+req.params.id)
    .then(post => res.send(post))
    .catch(next)
})

router.put('/addlife/:id', (req, res, next) => {
  Post.addLife(req.params.id, req.body)
    .then(() => {
      res.sendStatus(200)
    })
    .catch(() => {
      // log this in system
      // don't show user
      console.log('unable to record metrics', req.body)
      res.sendStatus(200)
    })
})

router.put('/myposts/:id', verifyToken, (req, res, next) => {
  if (req.user.id != req.body.userId) return res.sendStatus(403)

  Post.findOne({ where: { userId: req.user.id, id: req.params.id }})
    .then(post => {
      if (!post) throw new Error('post not found?')
      return post.update(req.body)
    })
    .then(() => res.sendStatus(200))
    .catch(next)
})

module.exports = router
