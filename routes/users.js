const router = require('express').Router()
const { User } = require('../db').models
const { verifyToken, generateToken } = require('./authMiddleware')

router.post('/', (req, res, next) => {
  User.createUser(req.body)
    .then(user => {
      res.send({ ditaKey: generateToken(user) })
    })
    .catch(next)
})

router.put('/', verifyToken, (req, res, next) => {
  User.updateUser(req.user.id, req.body)
    .then(user => {
      res.send({ ditaKey: generateToken(user) })
    })
    .catch(next)
})

module.exports = router