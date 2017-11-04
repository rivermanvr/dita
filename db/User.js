const db = require('./db')
const Sequelize = require('sequelize')

const User = db.define('user', {
    name: {
        type: Sequelize.STRING,
        allowNull:false,
        validate: {
            notEmpty: true
        }
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    username: {
        type: Sequelize.STRING,
        unique:true,
        allowNull:false,
        validate: {
            len: [2,14],
            is: /^[a-z0-9]+$/i  //will create more advanced regex to disallow special characters
            
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
    }
    /*Or store location as array? */
    /*
    location: {
        type: Sequelize.ARRAY(Sequelize.INTEGER) --> then validate that array has both lng/lat, its valid numbers, etc.
    }
    */
})

module.exports= User;