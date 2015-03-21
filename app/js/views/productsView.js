var baseView = require("./baseView");
var template = require("../templates/products/products.html");
var ProductsModel = require("../models/products");

var ProductsView = function(el){
    // Render the view
    this.template = template;
    this.el = el;
    this.render();
};

ProductsView.prototype = new baseView();

ProductsView.prototype.selectCategory = function(categoryId){
    // Destroy the current model
    this.model = null;
    this.render();

    // Create a new model and then render the new data
    this.model = new ProductsModel(categoryId);

    var ctx = this;
    this.model.onChange.subscribe(function(){
        ctx.render();
    });
    this.model.fetch();
};

ProductsView.prototype.render = function(){
    baseView.prototype.render(this);
};

module.exports = ProductsView;
