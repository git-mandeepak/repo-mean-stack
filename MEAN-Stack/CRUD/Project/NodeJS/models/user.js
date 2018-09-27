const mongoose = require('mongoose');

var User = mongoose.model('User', {
    UserName: {type: String},
    Email: {type: String},
    FirstName: {type: String},
    LastName: {type: String},
    Password: {type: String}
});

module.exports = { User };