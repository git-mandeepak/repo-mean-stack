const Request = require('request');

module.exports.getRemoteEmployees = (req, res) => {
    //console.log(req.body);
    Request.post({
        "headers": { "content-type": "application/json" },
        "url": "http://GIND04LXB5RF0N2.bdx.com/EM.WebApi/api/getemployees",
        "body": JSON.stringify(req.body)
    }, (error, response, body) => {
        if(error) {
            return console.log(error);
        }
        //console.log(JSON.parse(response.headers));
        res.send(JSON.parse(body));
    });
}

