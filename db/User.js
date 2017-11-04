const db = require( './db' ); 
 
const defineAttr = { 
  email: { 
    type: db.Sequelize.STRING, 
    allowNull: false, 
    validate: { 
      notEmpty: true 
    } 
  },
  password: { 
    type: db.Sequelize.STRING, 
    allowNull: false, 
    validate: { 
      notEmpty: true 
    } 
  } 
}; 
 
const defineOptions = {}; 
 
const User = db.define('user', defineAttr, defineOptions); 

module.exports = User; 