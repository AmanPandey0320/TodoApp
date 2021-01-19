const express = require('express')
const app = express()
const port = 3000
const db = require('./MyDB');
const createUser = require('./api/userControl');
const todo = require('./api/todo')

app.use('/user',createUser);
app.use('/todo',todo);

db.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))