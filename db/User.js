const db = require( './db' ); 
const { or } = db.Op
const bcrypt = require('bcrypt-as-promised')
const env = require('../env')

const defineAttr = { 
  email: { 
    type: db.Sequelize.STRING, 
    allowNull: false, 
    validate: { 
      notEmpty: true 
    },
    unique: true
  },
  username: { 
    type: db.Sequelize.STRING, 
    allowNull: false, 
    validate: { 
      notEmpty: true 
    },
    unique: true
  },
  password: { 
    type: db.Sequelize.STRING, 
    allowNull: false, 
    validate: { 
      notEmpty: true 
    } 
  } 
}; 

const hashInstancePass = (instance) => {
  return bcrypt.hash(instance.password, env.SALTROUNDS)
    .then(hashedPassword => {
      instance.password = hashedPassword
      return instance
    })
}

const checkHash = (plainPassword, hash) => {
  return bcrypt.compare(plainPassword, hash)
}
 
const defineOptions = {
  hooks: {
    beforeCreate(instance, options) {
      return hashInstancePass(instance)
    },
    beforeUpdate(instance, options) {
      return hashInstancePass(instance)
    }
  }
}; 
 
const User = db.define('user', defineAttr, defineOptions); 

User.matchUser = function(query, password) {
  return this.findOne({
    where: {
      [or]: [
        { email: [query] },
        { username: [query] } ]
    }
  })
  .then(user => {
    return checkHash(password, user.password)
      .then(res => {
        if (res) return user
      })
  })
}

module.exports = User; 