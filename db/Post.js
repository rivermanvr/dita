const db = require('./db')
const Sequelize = require('sequelize')
const Reply = require('./Reply')
const User = require('./User')
const StoryLine = require('./StoryLine')
const Post = db.define('post', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  body: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      len: [0,500]
    }
  },
  latitude: {
    type: Sequelize.FLOAT,
    allowNull: true,
    defaultValue: null,
    validate: { min: -90, max: 90 }
  },
  longitude: {
    type: Sequelize.FLOAT,
    allowNull: true,
    defaultValue: null,
    validate: { min: -180, max: 180 }
  },
  zip: {
    type: Sequelize.STRING,
    validate: {
      len: 5
    }
  },
  halflife: {
    type: Sequelize.FLOAT,
    defaultValue: 50
  },
  visitedBy: {
    // temporarily adding this
    // to track which user visited so it can't be spammed
    // counts for both visits + feedbacks
    // in the future, we can change it to use associations
    type: Sequelize.ARRAY(Sequelize.INTEGER),
    defaultValue: []
  }
})

// type constants
// export to external file?
const types = {
  VISIT: 1,
  REPLY: 8
}
const msPerDay = 24 * 60 * 60 * 1000

Post.prototype.updateHalfLife = function(life) {
  console.log(life)
  const daysPassed = Math.floor((new Date() - new Date(this.createdAt)) / msPerDay) + 1
  let hlToAdd = types[life.type]/daysPassed
  // doesn't take into account for unauth user spamming..
  // would have to do some cookie tracking...
  if (life.userId) {
    if (this.visitedBy.indexOf(life.userId) !== -1) {
      hlToAdd /= 4
    } else {
      // can't seem to do a push to this array and save
      // shows on Sequelize as object format
      // this.visitedBy.push(life.userId)

      // this works but it's ES6 on backend, heroku incompatible
      // this.visitedBy = [ ...this.visitedBy, life.userId ]

      let visitedBy = this.visitedBy
      visitedBy.push(life.userId)
      this.visitedBy = visitedBy
    }
  }
  this.halflife += hlToAdd
  this.halflife = this.halflife > 100 ? 100 : this.halflife
  return this.save()
}

// ****************** API ****************** //
Post.addLife = function(id, recordDetails) {
  // record user id
  return this.findById(id)
    .then(post => {
      if (!post) throw new Error(`Post with id: ${id} not found!`)

      return post.updateHalfLife(recordDetails)
    })
}

Post.findPosts = function(userId) {
  // modify this later for filter by archives etc.
  return this.findAll({ where: { userId } })
}

Post.findPostsWithReplies = function(userId) {
  return this.findAll({ 
    where: {userId},
    order: [['updatedAt', 'DESC']],
    include: [
      {
        model: Reply,
        include: [User]
      },
      {
        model: StoryLine
      }
    ]
  })
}

module.exports = Post;