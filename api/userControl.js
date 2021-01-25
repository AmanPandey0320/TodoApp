"use strict"
const express = require('express');
const route = express.Router();
const bodyParser = require('body-parser');
const pool = require('../db_config');

route.use(bodyParser.json());
route.use(bodyParser.urlencoded({ extended:true}));

route.post('/signup',async (req,res)=>{
    var body = req.body;
    var pre_sql =`SELECT * FROM users WHERE username='${body.username}'`;
    var sql =`INSERT INTO users (username, password) VALUES ('${body.username}', '${body.password}')`;
    try{
        var pre_result = await pool.query(pre_sql);
        if(pre_result.length == 0){
            await pool.query(sql);
            res.sendStatus(200);
        }else{
            res.send('user already exists');
        }
    }catch(err){
        console.log(err);
        res.send(err);
    }
});

route.post('/signin',async (req,res)=>{
    var body = req.body;
    var sql =`SELECT * FROM users WHERE username='${body.username}'`;
    try{
        var result = await pool.query(sql);
        if(result.length == 0)
        res.sendStatus(404);
        else if(result[0].password == body.password)
        res.sendStatus(200);
        else res.sendStatus(401);
    }catch(err){
        console.log(err);
        res.send(err);
    }
});

route.post('/delete', async (req,res)=>{
    var body = req.body;
    var username = body.username;
    var sql = `DELETE FROM users WHERE username='${username}'`;
    try{
        var result = await pool.query(sql);
        res.json(result);
    }catch(err){
        console.log(err);
        res.send(err);
    }
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

//issue branch

module.exports = route;