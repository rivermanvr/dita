const router = require('express').Router()
const { Location, User } = require('../db').models

router.get('/', (req, res, next) => {
  Location.findAll({ include: [{ model: User }] })
    .then(locations => res.send(locations))
    .catch(next)
})

module.exports = router