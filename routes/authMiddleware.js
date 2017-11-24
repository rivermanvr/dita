const jwt = require('jsonwebtoken')
const env = require('../env')

const publicUserData = (user) => ({
  user: {
    id: user.id,
    username: user.username,
    email: user.email,
    name: user.name
  }
})

// jwt verification middleware
module.exports.verifyToken = (req, res, next) => {
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

module.exports.generateToken = (data) => {
  return jwt.sign(publicUserData(data), env.JWTKEY)
}