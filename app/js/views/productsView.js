var baseView = require("./baseView");
var template = require("../templates/products.html");
var ProductsModel = require("../models/products");
var ProductDetailsView = require("./productDetailsView");
var CustomEvent = require("../utils/customEvent");

var ProductsView = function(el){

    baseView.call(this);
    // Render the view
    this.template = template;
    this.el = el;
    this.render();

    // Custom event that fires when it's ready
    this.onReady = new CustomEvent();
};

ProductsView.prototype = new baseView();

ProductsView.prototype.selectCategory = function(categoryId){
    // Destroy the current model and re-render so that it shows the loading indicator
    this.model = null;
    this.render();

    // Create a new model and then render the new data once it's ready
    this.model = new ProductsModel(categoryId);
    var ctx = this;
    this.model.onChange.subscribe(function(){
        ctx.render();
        if(ctx.model.data.products)
            ctx.onReady.trigger(this);
    });
    this.model.fetch();
    return this.model;
};

/**
 * Callback when user selects a product from the list
 * @param el
 * @returns {ProductDetailsView}
 */
ProductsView.prototype.handleSelectProduct = function(el){
    // Unselect the previously selected category
    if(this.selectedEl){
        this.selectedEl.className = "";
    }

    // Add the 'selected' classname to this one
    this.selectedEl = el;
    this.selectedEl.className = "selected";

    // Update the products view with a new category
    var dataIdAttr = el.attributes["data-id"];

    var modalContainer = document.createElement('div');
    document.body.appendChild(modalContainer);
    return new ProductDetailsView(modalContainer, dataIdAttr.value);
};

ProductsView.prototype.render = function(){
    baseView.prototype.render(this);

    var productEls = this.el.getElementsByTagName("a");
    var ctx = this;
    if(productEls.length > 0) {

        // Bind to the click event for all of these items
        for (var i = 0; i < productEls.length; i++) {
            productEls[i].addEventListener("click", function (evt) {
                evt.preventDefault();
                ctx.handleSelectProduct(evt.target);
            });
        }
    }
};

module.exports = ProductsView;
