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
    }
})

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