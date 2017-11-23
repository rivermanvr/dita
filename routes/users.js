const router = require('express').Router()
const { User, Location } = require('../db').models
const { verifyToken, generateToken } = require('./authMiddleware')

router.post('/', (req, res, next) => {
  const { user, location } = req.body
  let _user
  User.createUser(user)
    .then(newUser => { _user = newUser })
    .then(() => Location.addLocation(_user.id, location))
    .then(() => res.send({ ditaKey: generateToken(_user) }))
    .catch(next)
})

router.put('/', verifyToken, (req, res, next) => {
  User.updateUser(req.user.id, req.body)
    .then(user => res.send({ ditaKey: generateToken(user) }))
    .catch(next)
})

module.exports = router