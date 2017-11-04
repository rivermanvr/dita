const db = require('./db')
const Sequelize = require('sequelize')

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
    }
})

module.exports = Post;