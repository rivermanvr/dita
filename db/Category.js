const db = require('./db')
const Sequelize = require('sequelize')

const Catgeory = db.define({
    name: {
        type: Sequelize.STRING
    }
})

module.exports = Category