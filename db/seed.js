const db = require('./db')
const { User } = require('./index').models

const seed = () =>
  Promise.all([
    User.create({ email: 'kaz@dita.net', 'username': 'kaz', 'password': 'dita' }),
    User.create({ email: 'wasif@dita.net', 'username': 'wasif','password': 'dita' }),
    User.create({ email: 'vince@dita.net', 'username': 'vince','password': 'dita' }),
    User.create({ email: 'murray@dita.net', 'username': 'murray','password': 'dita' })
  ])

db.sync({ force: true })
  .then(seed)
  .then(() => {
    console.log('seeded')
    db.close()
  })