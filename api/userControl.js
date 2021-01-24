"use strict"
const express = require('express');
const route = express.Router();
const db = require('../MyDB');
const bodyParser = require('body-parser');
const pool = require('../db_config');

route.use(bodyParser.json());
route.use(bodyParser.urlencoded({ extended:true}));

route.post('/signup',(req,res)=>{
    var body = req.body;
    var pre_sql =`SELECT * FROM users WHERE username='${body.username}'`;
    db.query(pre_sql,(err,result)=>{
        if(err) throw err;
        if(result.length == 0){
            var sql =`INSERT INTO users (username, password) VALUES ('${body.username}', '${body.password}')`;
            db.query(sql,function(err){
                if(err) throw err;
                console.log('inserted Created');
                res.send('done');
            });
        }else
        res.send('user already exists');
        
    });//end of pre_sql
    
});

route.post('/signin',(req,res)=>{
    var body = req.body;
    var sql =`SELECT * FROM users WHERE username='${body.username}'`;
    db.query(sql,function(err, result, fields){
        if(err) throw err;
        console.log(result);
        if(result.length == 0)
        res.sendStatus(404);
        else if(result[0].password == body.password)
        res.sendStatus(200);
        else res.sendStatus(401);
    });
});

route.post('/delete',(req,res)=>{
    var body = req.body;
    var username = body.username;
    var sql = `DELETE FROM users WHERE username='${username}'`;
    db.query(sql,(err,result)=>{
        if(err) throw err;
        res.json(result);
    });
});

route.post('/alluser',async (req,res)=>{
    var sql = 'SELECT * FROM users';
    try{
        var result = await pool.query(sql);
        res.json(result);
    }catch(err){
        console.log(err);
        res.send(err);
    }

});

module.exports = route;