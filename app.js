const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser')
const morgan = require( 'morgan' );

app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/dist', express.static(path.join(__dirname, 'dist')));
app.use('/public', express.static(path.join(__dirname, '/public')));
app.use('/vendor/bootstrap', express.static(path.join(__dirname, 'node_modules/bootstrap')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use('/api', require('./routes'));
const U = require('./db/User')
const Post = require('./db/Post')


app.get('/*', (req, res, next)=> res.sendFile(path.join(__dirname, 'public/index.html')));

// ......error middleware not wired to anything.
// ......error status sent back to index.html

app.use((req, res, next) => {
  const error = new Error('page not found');
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  console.log(err)
  res.status(err.status || 500).send(err.message);
});

module.exports = app;
