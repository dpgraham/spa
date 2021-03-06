var CustomEvent = require("../utils/customEvent");

var BaseView = function(){

};

/**
 * Render the template with the given model data and insert it into the element
 * @param ctx
 */
BaseView.prototype.render = function(ctx){
    ctx = ctx || this;
    var data = !ctx.model ? {} : ctx.model.data;
    ctx.el.innerHTML = ctx.template(data);
};

module.exports = BaseView;