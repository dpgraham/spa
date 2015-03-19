var CustomEvent = require("../utils/customEvent");

/**
 * Javascript model that corresponds with an API endpoint.
 *
 * Similar to the Backbone Model
 *
 * @constructor
 */
var BaseModel = function(){

};

/**
 * URL of the endpoint
 */
BaseModel.prototype.url;

/**
 * An event that is fired when the data changes
 * @type {CustomEvent}
 */
BaseModel.prototype.onDoneFetch = new CustomEvent();

/**
 * Fetch the contents of that endpoint. Fires 'onChange' if the contents come back different.
 */
BaseModel.prototype.fetch = function(){

};