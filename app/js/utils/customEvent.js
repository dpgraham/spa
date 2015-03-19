/**
 * A custom event that can be subscribed to and triggered
 * @constructor
 */
var CustomEvent = function(){
    this._callbacks = [];
};

/**
 * Trigger the event
 */
CustomEvent.prototype.trigger = function(){

    // Call all of the callbacks that subscribed to this event
    for(var i=0; i<this._callbacks.length; i++){
        this._callbacks[i].apply(this, arguments);
    }
};

/**
 * Subscribe a callback to the event
 * @param cb {function}
 */
CustomEvent.prototype.subscribe = function(cb){
    this._callbacks.push(cb);
};

/**
 * Unsubscribe a callback or all callbacks
 * @param cb {function} Optional. If null unsubscribes all callbacks
 */
CustomEvent.prototype.unsubscribe = function(cb){
    for(var i=this._callbacks.length - 1; i>=0; i--){
        if(typeof(cb)==='undefined' || this._callbacks[i] == cb){
            this._callbacks.splice(i, 1);
        }
    }
};

module.exports = CustomEvent;