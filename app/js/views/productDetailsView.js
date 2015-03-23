var baseView = require("./baseView");
var template = require("../templates/productDetails.html");
var ProductDetailsModel = require("../models/productDetails");

var ProductDetailsView = function(el, id){
    // Render the view
    this.template = template;
    this.el = el;
    this.render();

    // Get the productDetails model
    this.model = new ProductDetailsModel(id);
    var ctx = this;
    this.model.onChange.subscribe(function(){
        ctx.render();
    });
    this.model.fetch();
};

ProductDetailsView.prototype = new baseView();

ProductDetailsView.prototype.render = function(){
    baseView.prototype.render(this);
    var ctx = this;
    this.el.getElementsByClassName("close")[0].addEventListener("click", function(){
        ctx.el.parentNode.removeChild(ctx.el);
    });
};

module.exports = ProductDetailsView;
