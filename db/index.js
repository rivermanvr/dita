const db = require( './db' )
const seed = require('./seed')
const User = require( './User' )
const Post = require('./Post')
const Reply = require('./Reply')
const Category = require('./Category')
const StoryLine = require('./StoryLine')
// associations

User.hasMany(StoryLine)
User.hasMany(Post)
User.hasMany(Reply)
Category.belongsToMany(Post, {through:'postCategory'})
Post.belongsToMany(Category, {through:'postCategory'})
Post.belongsTo(StoryLine)
Post.hasMany(Reply)
Category.belongsToMany(StoryLine, {through: 'storyCategory'})
StoryLine.belongsToMany(Category, {through: 'storyCategory'})



const sync = () => db.sync({ force: true })
.then(seed)
.then(() => {
  console.log('seeded')
  //db.close() whats this for?
})

module.exports = { sync, models: { User } };
