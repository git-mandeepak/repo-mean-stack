const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/CrudDB', {useNewUrlParser: true}, (err) => {
    if(!err)
        console.log('MongoDb connection Succeeded.');
    else
        console.log('Error in Db Connection: ' + JSON.stringify(err, undefined));
});

module.exports = {mongoose};