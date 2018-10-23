const express = require('express');
const passport = require('passport');
const _ = require('lodash');
var ObjectId = require('mongoose').Types.ObjectId;

var {User} = require('../models/user');


module.exports.getusers = (req, res) => {
    User.find((err, docs) => {
        if(!err) {
            res.send(docs);
        }
        else{
            console.log('Error in retrieving Users: ' + JSON.stringify(err, undefined, 2));
        }
    });
}

module.exports.getuserbyid = (req, res) => {
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
}

module.exports.register = (req, res, next) => {
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
            if(err.code == 11000)
                res.status(422).send(['Duplicate email address found.'])
            else
                next(err); 
            //console.log('Error in User Save: ' + JSON.stringify(err, undefined, 2));
        }
    });
}

module.exports.updateuser = (req, res) => {
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
}

module.exports.deleteuser = (req, res) => {
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
}

module.exports.authenticate = (req, res, next) => {
    console.log(req.body); 
    // call for passport authentication
    passport.authenticate('local', (err, user, info) => {   
        console.log(user);    
        // error from passport middleware
        if (err) return res.status(400).json(err);
        // registered user
        else if (user) return res.status(200).json({ "token": user.generateJwt() });
        // unknown user or wrong password
        else return res.status(404).json(info);
    })(req, res);
}

module.exports.userProfile = (req, res, next) =>{
    User.findOne({ _id: req._id },
        (err, user) => {
            if (!user)
                return res.status(404).json({ status: false, message: 'User record not found.' });
            else
                return res.status(200).json({ status: true, user : _.pick(user,['Email']) });
        }
    );
}