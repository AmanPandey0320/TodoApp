const util = require('util');
const mysql = require('mysql');

let pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "Aman@123",
    port:'3306',
    database:'todo',
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
