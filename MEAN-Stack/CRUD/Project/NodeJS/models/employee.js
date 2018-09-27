const mongoose = require('mongoose');

var employeeSchema = mongoose.Schema({
    name: {type: String},
    position: {type: String},
    office: {type: String},
    salary: {type: Number}
});

var Employee = mongoose.model('Employee', employeeSchema);

module.exports = { Employee };