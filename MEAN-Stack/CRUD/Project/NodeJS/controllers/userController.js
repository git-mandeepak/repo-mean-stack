const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var {User} = require('../models/user');

// => localhost:3000/users/
router.get('/', (req, res) => {
    User.find((err, docs) => {
        if(!err) {
            res.send(docs);
        }
        else{
            console.log('Error in retrieving Users: ' + JSON.stringify(err, undefined, 2));
        }
    });
});

router.get('/:id', (req, res) => {
    if(!ObjectId.isValid(req.params.id)){
        return res.status(400).send(`No record with given id: ${req.params.id}`);
    }

    User.findById(req.params.id, (err, doc) => {
        if(!err){
            res.send(doc);
        }
        else{
            console.log('Error in retrieving User: ' + JSON.stringify(err, undefined, 2));
        }
    });
});

// => localhost:3000/users
router.post('/', (req, res) => {
    var usr = new User({
        UserName: req.body.UserName,
        Email: req.body.Email,
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        Password: req.body.Password
    });

    usr.save((err, doc) => {
        if(!err) {
            res.send(doc);
        }
        else{
            console.log('Error in User Save: ' + JSON.stringify(err, undefined, 2));
        }
    });
});

router.put('/:id', (req, res) => {
    if(!ObjectId.isValid(req.params.id)){
        return res.status(400).send(`No record with given id: ${req.params.id}`);
    }

    var usr = {
        UserName: req.body.UserName,
        Email: req.body.Email,
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        Password: req.body.Password
    }

    User.findByIdAndUpdate(req.params.id, {$set: usr}, {new: true}, (err, doc) => {
        if(!err) {
            res.send(doc);
        }
        else{
            console.log('Error in User Update: ' + JSON.stringify(err, undefined, 2));
        }
    });
});

router.delete('/:id', (req, res) => {
    if(!ObjectId.isValid(req.params.id)){
        return res.status(400).send(`No record with given id: ${req.params.id}`);
    }

    User.findByIdAndRemove(req.params.id, (err, doc) => {
        if(!err) {
            res.send(doc);
        }
        else{
            console.log('Error in User delete: ' + JSON.stringify(err, undefined, 2));
        }
    });
});

module.exports = router;