const util = require('util');
const mysql = require('mysql');

let pool = mysql.createPool({
    host: "sql12.freesqldatabase.com",
    user: "sql12388059",
    password: "ph4jaBuSS8",
    port:'3306',
    database:'sql12388059',
});

pool.getConnection((err,con)=>{
    if(err)
    console.log(err);
    else
    console.log("connected to db");

    if(con) con.release();
    return;
});

pool.query = util.promisify(pool.query);

module.exports = pool;