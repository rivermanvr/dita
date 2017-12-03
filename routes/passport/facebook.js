const router = require( 'express' ).Router(),
  passport = require('passport'),
  FacebookStrategy = require('passport-facebook').Strategy,
  env = require('../../env'),
  { User } = require('../../db').models,
  { generateToken } = require('../authMiddleware'),
  faker = require('faker')

passport.use(
  new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID || env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET || env.FACEBOOK_APP_SECRET,
    callbackURL: 'http://localhost:2020/api/auth/facebook/verify',
    profileFields : [ 'emails', 'displayName', 'name', 'photos' ]
  },
  (accessToken, refreshToken, profile, done) => {
    const query = {
      facebookId: profile.id,
      email: profile.emails[0].value
    }

    const data = {
      username: faker.internet.userName().slice(0, 14),
      name: `${profile.name.givenName} ${profile.name.familyName}`,
      profilePic: profile.photos.length && profile.photos[0].value
    }

    User.passportAuth(query, data)
      .then(user => {
        done(null, user)
      })
      .catch(err => {
        done(null, false)
      })
  })
)

router.get('/',
  passport.authenticate('facebook', { scope: 'email' }))

router.get('/verify',
  passport.authenticate('facebook', { session: false }),
  (req, res, next) => {
    if (!req.user) return res.sendStatus(403)
    res.redirect(`/?=${generateToken(req.user)}`) 
  })

module.exports = router
