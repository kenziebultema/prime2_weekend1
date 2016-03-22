var express = require('express');
var router = express.Router();
var path = require('path');
var index = ('/index.js');

router.post('/employees', function(req, res){
    console.log('body', req.body);
    var firstName = req.body.first_name;
    var lastName = req.body.last_name;
    var id = req.body.employee_id;
    var jobTitle = req.body.job_title;
    var yearSalary = req.body.year_salary;

    pg.connect(connectionString, function(err, client, done){

        if(err){
            done();
            console.log('error', err);
            res.status(500).send(err);
        } else {
            var result = [];
            var query = client.query('INSERT INTO employees (first_name, last_name, employee_id, job_title, year_salary) VALUES ($1, $2, $3, $4, $5) RETURNING id, first_name, last_name, employee_id, job_title, year_salary', [first_name, last_name, employee_id, job_title, year_salary]);

            query.on('row', function(row){
                result.push(row);
            });

            query.on('end', function(){
                done();
                res.send(result);
            });

            query.on('error', function(error){
                console.log('error query', error);
                done();
                res.status(500).send(error);
            });
        }
    });
});

router.get('/employees', function(req, res){
    pg.connect(connectionString, function(err, client, done){

        if(err){
            done();
            console.log('error', err);
            res.status(500).send(err);
        } else {
            var result = [];
            var query = client.query('SELECT * FROM employees');

            query.on('row', function(row){
                result.push(row);
            });

            query.on('end', function(){
                done();
                res.send(result);
            });

            query.on('error', function(error){
                console.log('error query', error);
                done();
                res.status(500).send(error);
            });
        }
    });
});

module.exports = router;
