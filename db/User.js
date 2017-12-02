const db = require( './db' );
const Sequelize = require('sequelize') 
const { or } = db.Op
const faker = require('faker')
const bcrypt = require('bcrypt-as-promised')
const env = require('../env')

const defineAttr = {
  name: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    // unique: {
    //   args: true,
    //   msg: 'Account already registered with this email'
    // },
    validate: {
      isEmail: {
        args: true,
        msg: 'Must be a valid email'
      }
    }
  },
  username: {
    type: Sequelize.STRING,
    // unique: {
    //   args: true,
    //   msg: 'Account already registered with this username'
    // },
    allowNull: false,
    validate: {
      len: {
        args: [2,14],
        msg: 'Username must be between 2 and 14 characters'
      },
      notEmpty: true,
      is: {
        args: /^[a-z0-9]+$/i,  //will create more advanced regex to disallow special characters
        msg: 'Username must be lowercase without special characters'
      }
    }
  },
  password: { 
    type: db.Sequelize.STRING, 
    allowNull: false, 
    validate: { 
      notEmpty: true 
    } 
  },
  profilePic: {
    type: Sequelize.STRING,
    defaultValue: 'https://d30y9cdsu7xlg0.cloudfront.net/png/1335729-200.png',
    validate: {
      isUrl: true
    }    
  },
  googleId: {
    type: db.Sequelize.STRING
  },
  facebookId: {
    type: db.Sequelize.STRING
  }
  /*Or store location as array? */
    /*
    location: {
        type: Sequelize.ARRAY(Sequelize.INTEGER) --> then validate that array has both lng/lat, its valid numbers, etc.
    }
    */ 
}

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
      return instance.changed('password') ?
        hashInstancePass(instance) :
        instance
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
    if (!user) throw new Error('invalid')
    return checkHash(password, user.password)
      .then(res => {
        if (res) return user
      })
  })
}

User.createUser = function(data) {
  return this.create(data)
}

User.updateUser = function(id, data) {
  return this.findById(id)
    .then(user => {
      if (!user) throw new Error('user not found')
      return user.update(data)
    })
}

User.passportAuth = function(query, data) {
  console.log(query)
  return this.findOne({ where: query })
    .then(user => {
      if (user) return user

      Object.assign(data, query, { password: faker.internet.password() })
      return this.create(data)
    })
}

module.exports = User; 
