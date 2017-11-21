const db = require('./db')
const Sequelize = require('sequelize')
// const User = require('./User')

const Location = db.define('location', {
  address: {
    type: Sequelize.STRING,
    allowNull: false
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
  }
})

// ****************** api ****************** //
Location.addLocation = function(userId, data) {
  Object.assign(data, { userId })
  return this.create(data)
}

Location.removeLocation = function(userId, id) {
  return this.findOne({ where: { id, userId } })
    .then(location => location.destroy())
}

module.exports = Location