var mysql = require('mysql');

module.exports = mysql.createConnection({
  host: "sql12.freesqldatabase.com",
  user: "sql12388059",
  password: "ph4jaBuSS8",
  port:'3306',
  database:'sql12388059',
  stream:true,
});

