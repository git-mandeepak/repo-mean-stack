require('./config/config');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const {mongoose} = require('./db.js');
var employeeController = require('./controllers/employeeController.js');
var userController = require('./controllers/userController.js');

var app = express();
app.use(bodyParser.json());
app.use(cors({origin: 'http://gind04lxb5rf0n2.bdx.com'}));

// Routes
app.use('/api/employees', employeeController);
app.use('/api/users', userController);

// Error Handler
app.use((err, req, res, next) => {
    if (err.name === 'ValidationError') {
        var valErrors = [];
        Object.keys(err.errors).forEach(key => valErrors.push(err.errors[key].message));
        console.log("**"+valErrors+"**");
        res.status(422).send(valErrors)
    }
});

app.listen(process.env.PORT, () => console.log(`Server started at port: ${process.env.PORT}`));