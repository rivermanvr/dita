const db = require('./db')
const Sequelize = require('sequelize')
// const User = require('./User')

const Location = db.define('location', {
  address: {
    type: Sequelize.STRING,
    allowNull: {
      args: false,
      msg: 'Location is empty'
    }
  },
  lat: {
    type: Sequelize.FLOAT,
    allowNull: {
      args: false,
      msg: 'Location is empty'
    },
    validate: {
      min: -90,
      max: 90,
    }
  },
  lng: {
    type: Sequelize.FLOAT,
    allowNull: {
      args: false,
      msg: 'Location is empty'
    },
    validate: {
      min: -90,
      max: 90,
    }
  },
  isHome: {
    type: Sequelize.BOOLEAN,
    allowNull: {
      args: false,
      msg: 'Location is empty'
    }
  }
})

// ****************** api ****************** //
Location.addLocation = function(userId, data) {
  Object.assign(data, { userId })
  return this.create(data)
}

Location.removeLocation = function(userId, id) {
  return this.findAll({ where: { userId } })
    .then(locations => {
      if (locations.length == 1) throw new Error('Home location cannot be removed')
      else locations.find(location => location.id == id).destroy()
    })
}

Location.setHome = function(userId, id) {
  return this.findOne({ where: { userId, isHome: true } })
    .then(home => {
      if (home) return home.update({ isHome: false })
    })
    .then(() => {
      return this.findOne({ where: { id, userId } })
        .then(location => location.update({ isHome: true }))
    })
}

module.exports = Location