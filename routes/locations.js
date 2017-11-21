const router = require('express').Router()
const { User, Location } = require('../db').models
const { verifyToken } = require('./authMiddleware')

router.post('/', verifyToken, (req, res, next) => {
  Location.addLocation(req.user.id, req.body)
    .then(() => res.sendStatus(200))
    .catch(next)
})

router.get('/', verifyToken, (req, res, next) => {
  Location.findAll({ where: { userId: req.user.id }, order: [[ 'address', 'ASC' ]] })
    .then(locations => res.send(locations))
    .catch(next)
})

router.delete('/:id', verifyToken, (req, res, next) => {
  Location.removeLocation(req.user.id, req.params.id)
    .then(() => res.sendStatus(200))
    .catch(next)
})

router.put('/home/:id', verifyToken, (req, res, next) => {
  Location.setHome(req.user.id, req.params.id)
    .then(() => res.sendStatus(200))
    .catch(next)
})

module.exports = router
