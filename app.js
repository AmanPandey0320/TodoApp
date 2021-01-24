const express = require('express')
const app = express()
const port = 3000
const db = require('./MyDB');
const createUser = require('./api/userControl');
const todo = require('./api/todo');
const path =  require('path');

app.use('/user',createUser);
app.use('/todo',todo);
app.use('/',express.static('views'));

db.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});


app.get('/mytodoapp', (req, res) => res.sendFile(path.join(__dirname,'./views/index.html')));
app.listen(port, () => console.log(`Example app listening on port ${port}!`))