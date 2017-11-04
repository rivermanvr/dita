const db = require( './db' )
const User = require( './User' );

// associations





const sync = () => db.sync()
module.exports = { sync, models: { User } };
