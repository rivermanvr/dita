const db = require('./db')
const Sequelize = require('sequelize')

//Myabe we should keep track of the 'type/category' of the reply for analytical purposes? like how people tend to respond to funny/sad posts etc

const Reply = db.define('reply', {
    body: {
        type: Sequelize.TEXT
    }
})

module.exports = Reply