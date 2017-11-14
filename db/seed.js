const db = require('./db')
const sync = require('../db').sync
const {
  User, Post, Reply,
  Category, StoryLine } = require('../db').models

const users = [
  { name:'kaz', email: 'kaz@dita.net', 'username': 'kaz', 'password': 'dita' },
  { name:'wasif', email: 'wasif@dita.net', 'username': 'wasif','password': 'dita' },
  { name:'vince', email: 'vince@riversconsulting.com', 'username': 'vince','password': 'dita' },
  { name:'murray', email: 'murray@dita.net', 'username': 'murray','password': 'dita' }
]

const posts = [
  { title:'Today was great!', body:'just a random summary of my great day mayng', zip:'10028', latitude: 40.776441, longitude: -73.953509 },
  { title:'Today was solid!', body:'just a random summary of my solid day mayng', zip:'10027', latitude: 40.811407, longitude: -73.953060 },
  { title:'Today was amazing!', body:'just a random summary of my amazing day mayng', zip:'10026', latitude: 40.802381, longitude: -73.952681 },
  { title:'Tonight was dope!', body:'just a random summary of my dope night mayng', zip:'10025', latitude: 40.798601, longitude: -73.966622 },
  { title:'Tonight was bonkers!', body:'just a random summary of my bonkers night mayng', zip:'10024', latitude: 40.798452, longitude: -73.974428 },
  { title:'Today was wild!', body:'just a random summary of my wild day mayng', zip:'10023', latitude: 40.775921, longitude: -73.982607 },
  { title:'This morning was insane!', body:'just a random summary of my insane morning mayng', zip:'10022', latitude: 40.758628, longitude: -73.967948 }
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
    .then(cats => createUsers(cats))
}

const createReplies = (users) => {
  return Promise.all(replies.map(reply => {
    reply.userId = users[~~(Math.random() * 4)].id
    return Reply.create(reply)
      .then(reply => {
        return Post.findAll()
          .then (posts =>{
            return reply.update({
              postId :  posts[~~(Math.random() * 7)].id
            })
          })
        })
  }))
}

const createStories = (users, posts, cats) => {
  return Promise.all(stories.map((story,i) =>{
    story.userId = users[i].id
    return StoryLine.create(story)
      .then(story => {
        const randomCats = [cats[~~(Math.random() * 7)],cats[~~(Math.random() * 7)],cats[~~(Math.random() * 7)]]
        const uniqueCats = randomCats.filter((cat,index)=> {return randomCats.indexOf(cat) == index})
        return story.addCategories(uniqueCats)
          .then(() => Post.findAll())
          .then(posts => {
            return Promise.all(
              posts
                .filter(post => post.userId === story.userId)
                .map(post => {
                  return post.update({
                    storylineId: story.id
                  })
                })
            )
          })
      })
  })) 
  .then(() => createReplies(users))
}

const createPosts = (users, cats) => {
  return Promise.all(posts.map(post => {
    post.userId = users[~~(Math.random() * 4)].id
    return Post.create(post)
      .then(post => {
        const randomCats = [cats[~~(Math.random() * 7)],cats[~~(Math.random() * 7)],cats[~~(Math.random() * 7)]]
        const uniqueCats = randomCats.filter((cat,index)=> {return randomCats.indexOf(cat) == index})
        return post.addCategories(uniqueCats)
      })
  }))
  .then(posts => createStories(users,posts,cats))
}



const seed = () => {
  return db.sync({force:true})
  .then(createCategories)
}

seed()
.then(()=> {
  console.log('seed done')
  db.close()
})
