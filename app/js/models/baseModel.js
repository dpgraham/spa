var CustomEvent = require("../utils/customEvent");
var Ajax = require("simple-ajax");
var Config = require("config");

/**
 * Javascript model that corresponds with an API endpoint. Inherited by all other models.
 *
 * Similar to the Backbone Model
 *
 * @param data {Object} Initial values of the data. Optional.
 *
 * @constructor
 */
function BaseModel(data){
    this.onChange = new CustomEvent();
    this.onError = new CustomEvent();
    this.data = data || {};
    this.dataJSON = JSON.stringify(this.data);
};

/**
 * Root URL of the BestBuy API
 * @type {string}
 */
BaseModel.prototype.rootUrl = Config.rootUrl;

/**
 * URL of the endpoint
 */
BaseModel.prototype.url;


BaseModel.prototype._getFullURL = function(){
    return this.rootUrl + this.url;
};

/**
 * Gets up to date data using Ajax; can be overridden in unit tests to allow mock data
 * @param url {string} The URL that is posted
 * @param doneCb {function} Successful callback
 * @param err {function} Callback when error occurred
 */
BaseModel.prototype.sync = function(url, doneCb, errCb){
    // Perform an Ajax request
    var ajax = new Ajax(url);
    var ctx = this;
    ajax.on('success', function(evt){
        var resp = {
            data: evt.target.responseText,
            response: evt
        };
        doneCb(resp);
    });

    ajax.on('error', function(evt){
        errCb(evt);
    });

    ajax.send();
};

BaseModel.onError = new CustomEvent();

/**
 * Fetch the contents of that endpoint. Fires 'onChange' if the contents come back different.
 */
BaseModel.prototype.fetch = function(){
    var ctx = this;
    this.sync(this._getFullURL(), function(evt){
        // If the data changed, update the data and then fire the change event
        if(evt.data != ctx.dataJSON) {
            ctx.dataJSON = evt.data;
            ctx.data = JSON.parse(ctx.dataJSON);
            ctx.onChange.trigger(ctx);
        }
    }, function(evt){
        ctx.onError.trigger(evt);
        BaseModel.onError.trigger(evt);
    });
};

module.exports = BaseModel;