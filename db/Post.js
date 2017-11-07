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
    },
    latitude: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: null,
        validate: { min: -90, max: 90 }
    },
    longitude: {
        type: Sequelize.INTEGER,
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

module.exports = Post;