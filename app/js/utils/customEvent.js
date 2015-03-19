/**
 * A custom event that can be subscribed to and triggered
 * @constructor
 */
var CustomEvent = function(){

};

/**
 * Fire the event
 */
CustomEvent.prototype.trigger = function(){

};

/**
 * Subscribe a callback to the event
 * @param cb {function}
 */
CustomEvent.prototype.subscribe = function(cb){

};

/**
 * Unsubscribe a callback or all callbacks
 * @param cb {function} Optional. If null unsubscribes all callbacks
 */
CustomEvent.prototype.unsubscribe = function(cb){

};

module.exports = CustomEvent;