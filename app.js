'use strict';

// imports/requires some libs
const express       = require('express');
const log           = require('morgan');
const bodyParser    = require('body-parser');

// set up express app
const app = express();

// log requests to console
app.use(log('dev'));

// set static folder
app.use(express.static(__dirname + '/static'));

// parse the requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

// initial set up - catch all routes
app.get('*', (req, res) => res.status(200).send({
    message: 'Welcome to TED',
}));

// root route
app.get('/',function(req,res){
	res.sendFile(path.join(__dirname + '/index.html'));
});

// module.exports = app;
app.listen(8000);
console.log('running at port 8000');
