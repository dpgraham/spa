var appView = require("../../app/js/views/appView");
var categoriesView = require("../../app/js/views/categoriesView");
var productDetailsView = require("../../app/js/views/productDetailsView");
var productsView = require("../../app/js/views/productsView");
var assert = require("assert");


describe('Integration tests for the views', function(){

    var categoryId, productId;

    it("should render the appView", function(){
        // Create the app view
        var div = document.createElement("div");
        document.body.appendChild(div);
        var app = new appView(div);
        app.render();

        // Sanity check on the app data
        assert.notEqual(app.categoriesView, null);
        assert.notEqual(app.categoriesView.model, null);
        assert.equal(typeof(app.categoriesView.el.innerHTML), "string");
    });

    it("should render the categoriesView", function(done){
        // Create the categories view
        var div = document.createElement("div");
        document.body.appendChild(div);
        var categories = new categoriesView(div);

        categories.onReady.subscribe(function(){
            // Sanity check
            assert.equal(typeof(categories.el.innerHTML), "string");

            // Select a category from the list of anchor tags
            var categoryEls = categories.el.getElementsByTagName("a");

            // Get the selected category id
            var categoryModel = categories.handleSelectCategory(categoryEls[0]);
            assert.notEqual(categoryModel, null );
            assert.equal(typeof(categories.el.innerHTML), "string");
            categoryId = categoryModel.id;

            categories.onReady.unsubscribe();
            done();
        });
    });

    it("should render the products view", function(done){

        // Render the component
        var div = document.createElement("div");
        document.body.appendChild(div);
        var products = new productsView(div);
        products.selectCategory(categoryId);

        // When the component is ready, do some sanity checks
        products.onReady.subscribe(function(){
            // Sanity check
            assert.equal(typeof(products.el.innerHTML), "string");

            // Select a product
            var productEl = products.el.getElementsByTagName("a")[0];
            var productDetailsView = products.handleSelectProduct(productEl);
            assert.notEqual(productDetailsView, null);
            assert.notEqual(productDetailsView.model, null);
            assert.equal(typeof(productDetailsView.el.innerHTML), "string");

            // Get the product ID
            productID = productDetailsView.model.id;

            products.onReady.unsubscribe();
            done();
        });

    });

    it("should render the product details view modal", function(){
        // Render the component
        var div = document.createElement("div");
        document.body.appendChild(div);
        var productDetails = new productDetailsView(div, productId);

        // When the component is ready, do some sanity checks
        productDetails.onReady.subscribe(function(){

            // Sanity check
            assert.equal(typeof(productDetails.el.innerHTML), "string");

            // Test the remove method
            assert.notEqual(productDetails.el, null);
            productDetails.remove();
            assert.equal(productDetails.el, null);
            assert.notEqual(productDetails.model, null);

            productDetails.onReady.unsubscribe();
            done();
        });
    });


});