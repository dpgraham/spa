var CustomEvent = require("../utils/customEvent");
var Indicator = require("../utils/indicator");
var Ajax = require("simple-ajax");

/**
 * Javascript model that corresponds with an API endpoint.
 *
 * Similar to the Backbone Model
 *
 * @param data {Object} Initial values of the data. Optional.
 *
 * @constructor
 */
var BaseModel = function(data){
    this.onChange = new CustomEvent();
    this.onError = new CustomEvent();
    this.data = data || {};
    this.dataJSON = JSON.stringify(this.data);
};

/**
 * Root URL of the BestBuy API
 * @type {string}
 */
BaseModel.prototype.rootUrl = "http://www.bestbuy.ca/api/v2";

/**
 * URL of the endpoint
 */
BaseModel.prototype.url;

/**
 * Gets up to date data using Ajax; can be overridden in unit tests to allow mock data
 * @param url {string} The URL that is posted
 * @param doneCb {function} Successful callback
 * @param err {function} Callback when error occurred
 */
BaseModel.prototype.sync = function(url, doneCb, errCb){
    // Perform an Ajax request
    var ajax = new Ajax(this.rootUrl + this.url);
    var ctx = this;
    ajax.on('success', function(evt){
        doneCb(evt);
    });

    ajax.on('error', function(evt){
        errCb(evt);
    });

    ajax.send();
}

/**
 * Fetch the contents of that endpoint. Fires 'onChange' if the contents come back different.
 */
BaseModel.prototype.fetch = function(){
    var ctx = this;
    this.sync(this.rootUrl + this.url, function(evt){
        // If the data changed, update the data and then fire the change event
        if(evt.data != ctx.dataJSON) {
            ctx.dataJSON = evt.data;
            ctx.data = JSON.parse(ctx.dataJSON);
            ctx.onChange.trigger(ctx);
        }
    }, function(evt){
        ctx.onError.trigger(evt);
    });
};

module.exports = BaseModel;