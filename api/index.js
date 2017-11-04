const router = require( 'express' ).Router();
const jwt = require('jsonwebtoken')
const env = require('../env')
const { User } = require('../db').models

// jwt verification middleware
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']
  if (token) {
    const key = token.split(' ')[1]
    jwt.verify(key, env.JWTKEY, (err, data) => {
      if (err) return res.sendStatus(403)

      req.user = data.user
      next()
    })
  } else {
    res.sendStatus(403)
  }
}

const publicUserData = (user) => ({
  email: user.email
})

// login
router.post('/auth', (req, res, next) => {
  const { email, password } = req.body
  User.findOne({ where: { email, password } })
    .then(user => {
      if (!user) return res.sendStatus(403)

      const ditaKey = jwt.sign({ user: publicUserData(user) }, env.JWTKEY)
      res.send({ ditaKey })
    })
})

// sample
router.get('/auth', verifyToken, (req, res, next) => {
  User.findById(req.user.id)
    .then(user => {
      // pretend this is a Post.findByUserId call instead
      res.sendStatus(200)
    })
})

module.exports = router;
