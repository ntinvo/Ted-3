var express = require('express');
var router = express.Router();

/**************************************/
/*              USERS API             */
/**************************************/

/*############### NOTE ###############*/
/*       This router mounted at:      */
/*   http://localhost:3000/api/users  */
/*####################################*/

const knex = require('../db/knex');

/* GET all users */
router.get('/', function(req, res, next) {
    knex.select().table('users').then(users => {
        res.send(users);
    });
});

/* GET one user by id */
// NOTE: check if user exists first
router.get('/:id', function(req, res, next) {
    knex.select().table('users')
        .where('id', req.params.id).then(user => {
        res.send(user);
    });
});


/* POST (or insert) a user to db */
// NOTE: check if user exists in db or not before inserting
router.post('/', function(req, res, next) {
    knex('users').insert({
        name: req.body.name,
        isAdmin: req.body.isAdmin,
        email: req.body.email,
        password: req.body.password,
        address: req.body.address,
        date: req.body.date
    }).then(function() {
        knex.select().table('users')
            .where('email', req.body.email).then(user => {
            res.send(user);
        });
    });
});

/* PUT (or update) a user to db */
// NOTE: implement update a user by email also
// NOTE: check if users exists in db or not before updating
router.put('/:id', function(req, res, next) {
    knex('users').where('id', req.params.id).update({
        name: req.body.name,
        isAdmin: req.body.isAdmin,
        email: req.body.email,
        password: req.body.password,
        address: req.body.address,
        date: req.body.date
    }).then(function() {
        knex.select().table('users')
            .where('id', req.params.id).then(user => {
            res.send(user);
        });
    });
});


/* DELETE a user by id */
// NOTE: implement delete a user by email also
// NOTE: check if user exists
router.delete('/:id', function(req, res, next) {
    knex('users').where('id', req.params.id).del().then(function() {
        res.send('Successfully deleted a user!');
    });
});


module.exports = router;
