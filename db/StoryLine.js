const db = require('./db')
const Sequelize = require('sequelize')

const StoryLine = db.define('storyline', {
    title: {
        type: Sequelize.STRING
    },
    description: {
        type: Sequelize.STRING
    }
})

StoryLine.findMyStorylines = function(userId) {
  return this.findAll({ where: { userId } })
}

module.exports = StoryLine

