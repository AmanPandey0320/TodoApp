const express = require('express')
const app = express()
var server_port = process.env.YOUR_PORT || process.env.PORT || 3000;
var server_host = process.env.YOUR_HOST || '0.0.0.0';
const createUser = require('./api/userControl');
const todo = require('./api/todo');
const path =  require('path');

app.use('/user',createUser);
app.use('/todo',todo);
app.use('/',express.static('views'));

app.get('/mytodoapp',(req,res)=>{
  res.sendFile(path.join(__dirname+'/views/index.html'));
})

app.listen(server_port, server_host, function() {
  console.log('Listening on port %d', server_port);
});