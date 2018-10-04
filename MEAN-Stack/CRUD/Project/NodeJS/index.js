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

app.listen(process.env.PORT, () => console.log(`Server started at port: ${process.env.PORT}`));

app.use('/api/employees', employeeController);
app.use('/api/users', userController);