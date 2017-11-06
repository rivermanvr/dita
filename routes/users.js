const router = require('express').Router()
const { User } = require('../db').models
const { generateToken } = require('./authMiddleware')

router.post('/', (req, res, next) => {
  User.createUser(req.body)
    .then(user => {
      res.send({ ditaKey: generateToken(user) })
    })
    .catch(next)
})

module.exports = router