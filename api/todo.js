const express = require('express');
const route = express.Router();
const db = require('../MyDB');
const bodyParser = require('body-parser');
route.use(bodyParser.json());
route.use(bodyParser.urlencoded({ extended:true}));

//adds a task for the user
route.put('/add',(req,res)=>{
    var body = req.body;
    var sql =`INSERT INTO todoApp (id,time,title,description) VALUES ('${body.id}','${body.time}','${body.title}', '${body.description}')`;
    db.query(sql,function(err, result){
        if(err) throw err;
        res.json(result);
    });
});
 // get all task for a perticular user
 route.get('/tasks',(req, res)=>{
     var queryList = req.query;
     var username = queryList.username;
     var sql = `SELECT * FROM todoApp WHERE id='${username}'`;
     db.query(sql,(err,result)=>{
         if(err){
             console.log(err);
             res.sendStatus(500);
         }else
         res.json(result);
     });
 });

 //delete a task for a username
 route.delete('/delete',(req, res)=>{
     var body = req.body;
     var id = body.id;
     var time = body.time;
     var sql = `DELETE FROM todoApp WHERE id='${id}' AND time='${time}'`;
     db.query(sql, (err, result)=>{
         if(err) throw err;
         res.json(result);
     });
 });

 //update task of a user with
 route.put('/update', (req, res)=>{
     var body = req.body;
     var id = body.id;
     var time = body.time;
     var title = body.title;
     var description = body.description;
     var sql = `UPDATE todoApp SET title='${title}', description='${description}' WHERE id='${id}' AND time='${time}'`;
     db.query(sql, (err, result)=>{
         if(err) throw err;
         res.json(result);
     });
 });

module.exports = route;