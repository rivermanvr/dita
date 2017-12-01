const db = require('./db')
const sync = require('../db').sync
const {
  User, Post, Reply,
  Location, Category, StoryLine } = require('../db').models

const users = [
  { name: 'vince', email: 'vince@rivcon.com', username: 'vince', password: 'dita', profilePic:'https://usatftw.files.wordpress.com/2017/11/usp_nba__philadelphia_76ers_at_los_angeles_lakers_95365191-e1511314321431.jpg?w=1000&h=600&crop=1'},
  { name: 'kaz', email: 'kaz@dita.net', username: 'kaz', password: 'dita', profilePic:'https://imagesvc.timeincapp.com/v3/fan/image?url=https://thesixersense.com/wp-content/uploads/getty-images/2017/08/830248940-2017-nba-rookie-photo-shoot.jpg.jpg&' },
  { name: 'wasif', email: 'wasif@dita.net', username: 'wasif', password: 'dita', profilePic:'http://a1.espncdn.com/combiner/i?img=%2Fphoto%2F2017%2F0303%2Fr186814_1296x729_16%2D9.jpg' },
  { name: 'murray', email: 'murray@dita.net', 'username': 'murray', password: 'dita', profilePic:'https://img.bleacherreport.net/img/images/photos/003/706/425/d41845ec2e5fbd547a2be9b4be9d8e34_crop_north.jpg?h=533&w=800&q=70&crop_x=center&crop_y=top'}
]

const locations = [
  { address: 'Saitama', lat: 36.0187669, lng: 139.0248439, isHome: true },
  { address: 'New Hyde Park', lat: 40.7326609, lng: -73.6948277, isHome: true },
  { address: 'Paterson', lat: 40.9151955, lng: -74.2028202, isHome: true },
  { address: 'West Orange', lat: 40.7920341, lng: -74.2980747, isHome: true }
]

const posts = [
  { title: 'Thoughts Monday 11-20', body: 'Need to spend a 1/2 hour on -crack-the-code-interview each day', zip: '07424', latitude: 40.881172, longitude: -74.212063, userId: 4, halflife: 10 },
  { title: 'ToDo Tuesday 11-21', body: 'Develop a 1 page resume, keep 3 pager', zip: '07424', latitude: 40.881172, longitude: -74.212063, userId: 4, halflife: 15 },
  { title: 'ToDo Friday 11-17', body: 'Going to brunch at the Culinary Institute on Sat', zip: '10026', latitude: 41.745849, longitude: -73.932718, userId: 4, halflife: 25 },
  { title: 'RivCon ToDo', body: 'Need to do paperwork for Corp Insurance Coverages', zip: '07424', latitude: 40.881172, longitude: -74.212063, userId: 4, halflife: 35 },
  { title: 'Garth Brooks', body: 'tickets to Garth concert on friday 12-1 at NJPAC', zip: '07102', latitude: 40.735657, longitude: -74.172367, userId: 4, halflife: 45 },
  { title: 'Fullstack finished', body: 'December 7, 2017 is our last day of class! - graduating', zip: '10005', latitude: 40.704595, longitude: -74.008906, userId: 4, halflife: 55 },
  { title: 'ToDo Tuesday 11-21', body: 'Develop a 1 page resume, keep 3 pager', zip: '07424', latitude: 40.881172, longitude: -74.212063, userId: 4, halflife: 65 },
  { title: 'Invited to take a test!', body: 'IBM sent a link for a test, I have 5 days to complete it', zip: '07424', latitude: 40.881172, longitude: -74.212063, storylineId: 2, userId:3, halflife: 75 },
  { title: 'Test Response', body: 'my first test - need to practice for this kind of test', zip: '07424', latitude: 40.881172, longitude: -74.212063, userId: 4, storylineId: 2, halflife: 85 },
  { title: 'Rejection', body: 'not surprised - was rejected, but now I know what to expect on these tests', zip: '07424', latitude: 40.881172, longitude: -74.212063, userId: 4, storylineId: 2, halflife: 95 },
  { title: 'reusable components', body: 'This project has me focused on creating single function - reusable components', zip: '10005', latitude: 40.704595, longitude: -74.008906, userId: 4, storylineId: 3, halflife: 30 },
  { title: 'Working on my final items', body: 'need to get these final items finished before Tuesday night', zip: '10005', latitude: 40.704595, longitude: -74.008906, userId: 4, storylineId: 3, halflife: 40 },
  { title: '1 or two nights to finish up', body: 'We need to clean up our code quickly, only a few days left', zip: '10005', latitude: 40.704595, longitude: -74.008906, userId: 4, storylineId: 3, halflife: 50 },
  { title: 'presenting results', body: 'We have to present our final results on Tuesday the 5th of Dec.', zip: '10005', latitude: 40.704595, longitude: -74.008906, userId: 4, storylineId: 3, halflife: 60 },
  { title: 'Working on the ceiling', body: 'Neal had a leak in the roof, showing him how to spackle the ceiling', zip: '07076', latitude: 40.640040, longitude: -74.369018, userId: 4, storylineId: 1, halflife: 70 },
  { title: 'molding', body: 'working on the basement floor molding now', zip: '07076', latitude: 40.640040, longitude: -74.369018, userId: 4, storylineId: 1, halflife: 80 },
  { title: 'doing puzzles', body: 'doing puzzles with the grand-kids.  Ryan is REALLY GOOD at it.', zip: '07076', latitude: 40.640040, longitude: -74.369018, userId: 4, storylineId: 1, halflife: 90 },
  { title: 'pizza time', body: 'time for pizza and garlic bread for dinner, it was a nice day', zip: '07076', latitude: 40.640040, longitude: -74.369018, userId: 4, storylineId: 1, halflife: 100 }
]

const categories = [
  { name: 'Fun' },
  { name: 'Work' },
  { name: 'Inspirational' },
  { name: 'Happy' },
  { name: 'Sad' },
  { name: 'Technology' },
  { name: 'School' },
  { name: 'Funny' }
]

const stories = [
  { title: 'Sunday with the family', description: 'At Pam & Neal"s home', userId: 4 },
  { title: 'Interview at IBM', description: 'sent my resume for fun & got an interview', userId: 4 },
  { title: 'Working on the final project', description: 'Fullstack Academy final project', userId: 4 },
]

const replies = [
  { body: 'Wow, good luck!', userId: 1, postId: 8 },
  { body: 'Break a leg!', userId: 2, postId: 8 },
  { body: 'Let me know what happens', userId: 3, postId: 8 },
  { body: 'How do you think you did?', userId: 3, postId: 9 },
  { body: 'OMG - No Wayyyyy!', userId: 3, postId: 10 },
  { body: 'Did you get crack the coding interview?', userId: 1, postId: 9 },
  { body: 'I am glad we put the components on the NAV bar', userId: 2, postId: 11 },
  { body: 'I am going to to too, but I may not be able to.', userId: 3, postId: 12 },
  { body: 'I have been distracted, but I am focused now!!', userId: 1, postId: 12 },
  { body: 'As soon as I get home, I am on it too.', userId: 2, postId: 12 },
  { body: 'We need to practice before Tuesday', userId: 1, postId: 14 },
  { body: 'They have you working for your dinner!!!', userId: 1, postId: 15 },
  { body: 'I love puzzles!!', userId: 1, postId: 17 },
  { body: 'I am glad you had time to be with them, looked like it was a work visit.', userId: 2, postId: 17 },
  { body: 'How many grandchildren do you have?', userId: 3, postId: 17 },
  { body: 'How old are your kids?', userId: 1, postId: 17 },
  { body: 'It is always good to eat pizza!!', userId: 3, postId: 18 },
  { body: 'I think they should have made a filet minion', userId: 2, postId: 18 },
  { body: 'Did you take home the leftovers?', userId: 1, postId: 18 }
]

const createReplies = () => {
  return Promise.all(replies.map(reply => {
    return Reply.create(reply)
  }))
}

const createPosts = () => {
  return Promise.all(posts.map(post => {
    return Post.create(post)
  }))
   .then(() => createReplies(users))
}

const createStories = () => {
  return Promise.all(stories.map(story => {
    return StoryLine.create(story)
  }))
    .then(createPosts)
}

const createUsers = () => {
  return Promise.all(users.map(user => User.create(user)))
    .then(_users => Promise.all(_users.map((user, i) => Location.addLocation(user.id, locations[i]))))
    .then(createStories)
}

const createCategories = () => {
  return Promise.all(categories.map(category => Category.create(category)))
   .then(createUsers)
}

const seed = () => {
  return db.sync({ force: true })
  .then(createCategories)
}

seed()
.then(() => {
  console.log('seed done')
  db.close()
})
