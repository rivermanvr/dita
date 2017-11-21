const db = require( './db' )
const User = require( './User' )
const Post = require('./Post')
const Reply = require('./Reply')
const Category = require('./Category')
const StoryLine = require('./StoryLine')
const Location = require('./Location')
// associations

User.hasMany(StoryLine)
User.hasMany(Post)
User.hasMany(Reply)
Reply.belongsTo(User)
Post.belongsTo(User)
Category.belongsToMany(Post, {through:'postCategory'})
Post.belongsToMany(Category, {through:'postCategory'})
Post.belongsTo(StoryLine)
// Post.belongsToMany(StoryLine, {through: 'postStory'})
Post.hasMany(Reply)
Category.belongsToMany(StoryLine, {through: 'storyCategory'})
StoryLine.belongsToMany(Category, {through: 'storyCategory'})
User.hasMany(Location)
Location.belongsTo(User)



const sync = () => db.sync()
.catch(err => {
  console.log(err.message)
  db.close()
})


module.exports = { sync, models: { User, Post, Reply, Category, StoryLine, Location } };
