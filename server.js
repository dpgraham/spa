var express = require('express');
var app = express();
var request = require('request');
var bodyParser = require('body-parser');

app.use(bodyParser.json());

/**
 * Proxy through API requests to the Best Buy backend
 */
app.get(/^\/api\/(.+)/, function(req, res){
    request("http://www.bestbuy.ca/api/v2/json/" + req.params[0], function(error, response, body){
        if(!error && response.statusCode === 200) {
            res.json(JSON.parse(body));
        }
    });
});

/**
 * Proxy through client asset requests to static assets
 */
app.use('/client', express.static(__dirname + '/dist'));
app.use(express.static(__dirname + '/dist'));

app.listen(3000);