const db = require( './db' )
const Test = require( './Test' );

const sync = () => db.sync({force: true});

const seed = () => {
  return sync()
    .then(() => {
      const promiseArr = [
        Test.create({ name: 'Wasif' }),
        Test.create({ name: 'Kazue' }),
        Test.create({ name: 'Murray' }),
        Test.create({ name: 'Vince' })
      ]
      return Promise.all(promiseArr);
    }
  )
};

module.exports = { seed, sync, models: { Test } };
