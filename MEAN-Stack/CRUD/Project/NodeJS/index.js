const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const {mongoose} = require('./db.js');
var employeeController = require('./controllers/employeeController.js');
var userController = require('./controllers/userController.js');

var app = express();
app.use(bodyParser.json());
app.use(cors({origin: 'http://gind04lxb5rf0n2.bdx.com'}));

app.listen(3000, () => console.log('Server started at port: 3000'));

app.use('/employees', employeeController);
app.use('/users', userController);