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
var Sequelize = require('sequelize')
  , sequelize = new Sequelize('postgres', 'postgres', '123456', {
      dialect: "postgres",
      port:    5432,
    });

sequelize
  .authenticate()
  .then(function(err) {
    console.log('Connection has been established successfully.');
  }, function (err) {
    console.log('Unable to connect to the database:', err);
  });

var Users = sequelize.define('Users', {
  name: Sequelize.STRING,
  email: Sequelize.STRING,
  password: Sequelize.STRING,
  address: Sequelize.STRING
});

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
    console.log('It worked.')
  }, function (err) {
    console.log('An error occurred!!!', err);
  });



// parse the requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

// initial set up - catch root route
app.get('/', (req, res) => res.status(200).send({
    message: 'Welcome to TED',
}));



//
// // root route
// app.get('/',function(req,res){
// 	res.sendFile(path.join(__dirname + '/index.html'));
// });




// module.exports = app;
app.listen(8000);
console.log('running at port 8000');
