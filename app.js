const express = require('express')
const app = express()
const port = process.env.port;
const createUser = require('./api/userControl');
const todo = require('./api/todo');
const path =  require('path');

app.use('/user',createUser);
app.use('/todo',todo);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))