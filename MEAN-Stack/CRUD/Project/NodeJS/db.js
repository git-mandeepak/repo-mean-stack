const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true}, (err) => {
    if(!err)
        console.log('MongoDb connection Succeeded.');
    else
        console.log('Error in Db Connection: ' + JSON.stringify(err, undefined));
});

module.exports = {mongoose};