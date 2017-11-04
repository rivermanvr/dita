const db = require('./db')
const { User } = require('./index').models

const seed = () =>
  Promise.all([
    User.create({ email: 'kaz@dita.net', 'password': 'dita' }),
    User.create({ email: 'wasif@dita.net', 'password': 'dita' }),
    User.create({ email: 'vince@dita.net', 'password': 'dita' }),
    User.create({ email: 'murray@dita.net', 'password': 'dita' })
  ])

db.sync({ force: true })
  .then(seed)
  .then(() => {
    console.log('seeded')
    db.close()
  })