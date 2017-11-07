const db = require('./db')
const User = require( './User' )
const Post = require('./Post')
const Reply = require('./Reply')
const Category = require('./Category')
const StoryLine = require('./StoryLine')
//
const users = [{ name:'kaz', email: 'kaz@dita.net', 'username': 'kaz', 'password': 'dita' },{ name:'wasif', email: 'wasif@dita.net', 'username': 'wasif','password': 'dita' },{ name:'vince', email: 'vince@dita.net', 'username': 'vince','password': 'dita' },{ name:'murray', email: 'murray@dita.net', 'username': 'murray','password': 'dita' }]

const posts = [
  { title:'Today was great!', body:'just a random summary of my great day mayng', zip:'10028'},
  { title:'Today was solid!', body:'just a random summary of my solid day mayng', zip:'10027'},
  { title:'Today was amazing!', body:'just a random summary of my amazing day mayng', zip:'10026'},
  { title:'Tonight was dope!', body:'just a random summary of my dope night mayng', zip:'10025'},
  { title:'Tonight was bonkers!', body:'just a random summary of my bonkers night mayng', zip:'10024'},
  { title:'Today was wild!', body:'just a random summary of my wild day mayng', zip:'10023'},
  { title:'This morning was insane!', body:'just a random summary of my insane morning mayng', zip:'10022'}
]

const categories = [
  {name: 'Fun'},
  {name: 'Work'},
  {name: 'WTF'},
  {name: 'Inspirational'},
  {name: 'Happy'},
  {name: 'Sad'},
  {name: 'Funny'},
]

const stories = [
  {title:'Youll never believe this'},
  {title:'Found the one..'},
  {title:'I just corrupted our database on my first day -_-'},
  {title:'My goals: A day by day update'}
]

const replies = [
  {body: 'Damn son I had no idea! Thats crazy. I wanna hear more'},
  {body: 'Wow! Im so sorry to hear that :('},
  {body: 'I cant believe that! You wild for this'},
  {body: 'Cool!!'},
  {body: 'Good shit. Make sure you follow up tomorrow!'},
  {body: 'If I were you i probably wouldnt have done that.'},
  {body: 'lololol u wot m8'},
  {body: 'good luck tomorrow! hope it goes well for you. keep us posted!'},
  {body: 'ok dis interesting. subscribed!'},
  {body: 'this is def not a happy story lel. retag plz'},
  {body: 'wow this story is peak internet. im logging off for the night'}
]

const createUsers = (cats) => {
  return Promise.all(users.map(user => User.create(user)))
  .then(users => createPosts(users,cats))
}

const createCategories = (posts) => {
  return Promise.all(categories.map(c => Category.create(c)))
  .then((cats)=> createUsers(cats))
}

const createReplies = (users) => {
  return Promise.all(replies.map(reply => {
    reply.userId = users[~~(Math.random() * 4)].id
    Reply.create(reply)
    .then(reply => {
      Post.findAll()
      .then (posts =>{
        reply.update({
          postId :  posts[~~(Math.random() * 7)].id
        })
      })
    })
  }))
}

const createStories = (users, posts, cats) => {
  return Promise.all(stories.map(story =>{
    story.userId = users[~~(Math.random() * 4)].id
    StoryLine.create(story)
    .then(story => {
      const randomCats = [cats[~~(Math.random() * 7)],cats[~~(Math.random() * 7)],cats[~~(Math.random() * 7)]]
      const uniqueCats = randomCats.filter((cat,index)=> {return randomCats.indexOf(cat) == index})
      story.addCategories(uniqueCats)
      Post.findAll()
      .then(posts => {
        posts.forEach((post)=>{
          if(post.userId === story.userId){
            post.update({
              storylineId: story.id
            }) 
          }
        })
      })
    })
  })) 
  .then(()=> createReplies(users))
}

const createPosts = (users, cats) => {
  return Promise.all(posts.map(post => {
    post.userId = users[~~(Math.random() * 4)].id
    Post.create(post)
    .then((post)=> {
      const randomCats = [cats[~~(Math.random() * 7)],cats[~~(Math.random() * 7)],cats[~~(Math.random() * 7)]]
      const uniqueCats = randomCats.filter((cat,index)=> {return randomCats.indexOf(cat) == index})
      post.addCategories(uniqueCats)
    })
  }))
  .then(posts => createStories(users,posts,cats))
}



const seed = () => {
  createCategories()
}

module.exports = seed