const db = require( './db' )
const User = require( './User' );

const sync = () => db.sync()

module.exports = { sync, models: { User } };
