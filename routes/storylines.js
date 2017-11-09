const router = require('express').Router()
const { StoryLine } = require('../db').models


router.get('/', (req, res, next) => {
  StoryLine.findAll()
    .then(storylines => {
      res.send(storylines)
    })
    .catch(next);
})



module.exports = router


