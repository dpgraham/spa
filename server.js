var express = require('express');
var app = express();
var request = require('request');
var bodyParser = require('body-parser');
var cors = require('cors');
var argv = require('minimist')(process.argv.slice(2));

app.use(bodyParser.json());

// If it's not a production server allow Cross Origin Resource Sharing
if(!argv.prod) {
    app.use(cors());
}

/**
 * Proxy through API requests to the Best Buy backend
 */
app.get(/^\/api\/(.+)/, function(req, res){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    console.log("Proxying through: " + "http://www.bestbuy.ca/api/v2/json/" + req.params[0]);
    request("http://www.bestbuy.ca/api/v2/json/" + req.params[0], function(error, response, body){
        if(!error && response.statusCode === 200) {
            res.json(JSON.parse(body));
        } else {
            res.status(response.statusCode).send(response.responseText);
        }
    });
});

/**
 * Proxy through client asset requests to static assets
 */
app.use('/client', express.static(__dirname + '/dist'));
app.use(express.static(__dirname + '/dist'));


var port = argv.prod ? 80 : (argv.port || 3000);
console.log("Starting server at port: " + port);
var server = app.listen(port);


// Export method that closes the server down
module.exports = {
    close: function(){
        console.log("Closing server at port: " + port);
        server.close();
    },

    enableCORS: function(){
        app.use(cors());
    }
}