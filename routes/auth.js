const router = require( 'express' ).Router();
const { User } = require('../db').models
const { generateToken } = require('./authMiddleware')

const publicUserData = (user) => ({
  id: user.id,
  email: user.email
})

// login
router.post('/', (req, res, next) => {
  const { query, password } = req.body
  User.matchUser(query, password)
    .then(user => {
      if (!user) return res.sendStatus(403)

      const tokenData = { user: publicUserData(user) }
      res.send({ ditaKey: generateToken(tokenData) })
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
