var baseView = require("./baseView");
var template = require("../templates/categories.html");
var Categories = require("../models/categories");
var ProductsView = require("../views/productsView");

var CategoriesView = function(el){

    // Render without any data... this will show a loading screen
    this.template = template;
    this.el = el;
    this.render();

    // Fetch the categories. When the categories arrive this will show a list of items
    this.model = new Categories();
    var ctx = this;
    this.model.onChange.subscribe(function(){
        console.log("Data updated");
        ctx.render();
    });
    this.model.fetch();

    // Create a 'ProductsView' which shows the products associated with this category
    this.productsView = new ProductsView(document.getElementById("main_content"));
};

CategoriesView.prototype = new baseView();

CategoriesView.prototype.handleSelectCategory = function(el){
    // Unselect the previously selected category
    if(this.selectedEl){
        this.selectedEl.className = "";
    }

    // Add the 'selected' classname to this one
    this.selectedEl = el;
    this.selectedEl.className = "selected";

    // Update the products view with a new category
    var dataIdAttr = el.attributes["data-id"];
    if(dataIdAttr){
        this.productsView.selectCategory(dataIdAttr.value);
    }
}

CategoriesView.prototype.render = function(){
    baseView.prototype.render(this);

    var categoryEls = this.el.getElementsByTagName("a");
    var ctx = this;
    if(categoryEls.length > 0) {

        // Bind to the click event for all of these items
        for (var i = 0; i < categoryEls.length; i++) {
            categoryEls[i].addEventListener("click", function (evt) {
                ctx.handleSelectCategory(evt.target);
            });
        }

        // Select the first item, by default
        this.handleSelectCategory(categoryEls[0]);
    }
};

module.exports = CategoriesView;
