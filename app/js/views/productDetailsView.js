var baseView = require("./baseView");
var template = require("../templates/productDetails.html");
var ProductDetailsModel = require("../models/productDetails");
var CustomEvent = require("../utils/customEvent");

var ProductDetailsView = function(el, id){
    baseView.call(this);

    // Render the view
    this.template = template;
    this.el = el;
    this.render();

    // Callback when done rendering
    this.onReady = new CustomEvent();

    // Get the productDetails model and render the data
    this.model = new ProductDetailsModel(id);
    var ctx = this;
    this.model.onChange.subscribe(function(){
        ctx.render();
        ctx.onReady.trigger();
    });
    this.model.fetch();
};

ProductDetailsView.prototype = new baseView();

/**
 * Close this view down
 */
ProductDetailsView.prototype.remove = function(){
    this.el.parentNode.removeChild(this.el);
};

ProductDetailsView.prototype.render = function(){
    baseView.prototype.render(this);
    var ctx = this;
    this.el.getElementsByClassName("close")[0].addEventListener("click", function(){
        ctx.remove()
    });
};

module.exports = ProductDetailsView;
