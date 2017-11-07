const router = require( 'express' ).Router();
const { User } = require('../db').models


const { generateToken } = require('./authMiddleware')

// login
router.post('/', (req, res, next) => {
  const { query, password } = req.body
  User.matchUser(query, password)
    .then(user => {
      if (!user) return res.sendStatus(403)

      res.send({ ditaKey: generateToken(user) })
    })
    .catch(err => {
      if (err.message == 'invalid') {
        return res.status(403).send('invalid username/email/password')
      }
    })
    .catch(next)
})

// sample
const { verifyToken } = require('./authMiddleware')
router.get('/', verifyToken, (req, res, next) => {
  User.findById(req.user.id)
    .then(user => res.send(`Logged in as ${user.username}`))
    .catch(next)
})

module.exports = router;
