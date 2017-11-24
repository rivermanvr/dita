const router = require('express').Router()
const { User, Post, StoryLine, Reply } = require('../db').models

router.post('/', (req, res, next) =>{
    Reply.create(req.body)
    .then(reply => res.send(reply))
    .catch(next);
})

module.exports = router;