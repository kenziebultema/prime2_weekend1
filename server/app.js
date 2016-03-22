var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var pg = require('pg');
var index = require('./routes/index.js');

var app = express();

var port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/', index);

var connectionString;

if(process.env.DATABASE_URL){
    pg.defaults.ssl = true;
    connectionString = process.env.DATABASE_URL;
} else {
    connectionString = 'postgres://localhost:5432/weekend1_redo';
}

pg.connect(connectionString, function(err, client, done){
    if(err){
        console.log('error connecting to DB', err);
    } else {
        var query = client.query('CREATE TABLE IF NOT EXISTS employees ('
                                + 'id SERIAL PRIMARY KEY,'
                                + 'first_name varchar(80) NOT NULL,'
                                + 'last_name varchar(80) NOT NULL,'
                                + 'employee_id varchar(20) NOT NULL,'
                                + 'job_title varchar(150) NOT NULL,'
                                + 'year_salary varchar(12) NOT NULL);');
        query.on('end', function(){
            console.log('success created schema');
            done();
        });
        query.on('error', function(){
            console.log('error creating schema');
            done();
        });
    }
});

app.listen(port, function(){
    console.log('listening on port', port);
});

module.exports = app;
