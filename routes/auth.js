const router = require( 'express' ).Router();
const { User } = require('../db').models
const { generateToken } = require('./authMiddleware')

const publicUserData = (user) => ({
  id: user.id,
  email: user.email
})

// login
router.post('/', (req, res, next) => {
  const { email, password } = req.body
  User.matchUser(email, password)
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
    .then(user => {
      // pretend this is a Post.findByUserId call instead
      res.sendStatus(200)
    })
})

module.exports = router;
