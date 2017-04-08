'use strict';

// imports/requires some libs
const express       = require('express');
const log           = require('morgan');
const bodyParser    = require('body-parser');
const usersList     = require('./users').arr;

// set up express app
const app = express();

// log requests to console
app.use(log('dev'));

// set static folder
app.use(express.static(__dirname + '/static'));

// check connection to postgres database
var Sequelize = require('sequelize');
var sequelize = new Sequelize('postgres', 'postgres', '123456', {
    dialect: "postgres",
    port:    5432,
});

// define users table
var Users = sequelize.define('Users', {
  name: Sequelize.STRING,
  email: Sequelize.STRING,
  password: Sequelize.STRING,
  address: Sequelize.STRING
});

// parse the requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// initial set up - catch root route
app.get('/', (req, res) => res.status(200).send({
    message: 'Welcome to TED',
}));

// delete on production
// add users to db - TESTING ONLY
app.get('/add', function(req, res) {
    sequelize
    .sync({force:true})
    .then(function(err) {
        usersList.forEach(function(user) {
            var userInstance = Users.build({
                name: user.name,
                email: user.email,
                password: user.password,
                address: user.address
            });
            userInstance.save();
        });
        res.send('Successfully added users');
    }, function (err) {
        console.log('An error occurred!!!', err);
    });
});


//----------------------------------------//
//                  API                   //
//----------------------------------------//
// get all users
app.get('/api/users',function(req, res){
    sequelize
    .sync()
    .then(function(err) {
        Users.findAll().then(function(users) {
            res.send(users);
        });
    }, function (err) {
        res.send('An error occurred!!!', err);
    });
});

// add a user to the database
app.post('/api/users', function(req, res) {
    sequelize
    .sync()
    .then(function(err) {
        var userInstance = Users.build({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            address: req.body.address
        });
        userInstance.save();
        res.send('Successfully added a user.');
    }, function(err) {
        res.send('An error occurred!!!', err);
    });
});

// delete a user BY EMAIL
app.delete('/api/users', function(req, res) {
    sequelize
    .sync()
    .then(function(err) {
        Users.findOne({
            where: { email: req.body.email }
        }).then(function(user) {
            if(!user) {
                res.send('User does not exist!');
            } else {
                Users.destroy({
                    where: { email: req.body.email }
                });
                res.send('Successfully deleted user ' + user.name + ' with email ' + user.email);
            }
        });
    }, function(err) {
        res.send('An error occurred!!!', err);
    });
});

// module.exports = app;
app.listen(8000);
console.log('running at port 8000');
