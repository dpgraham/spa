var CategoriesModel = require("../../app/js/models/categories");
var BaseModel = require("../../app/js/models/baseModel");
var assert = require("assert");

describe('test the model sync method', function(){

    it("should fire the done callback when the endpoint is valid", function(done){
        BaseModel.prototype.sync("http://localhost:3000/api/search?categoryid=20001", function(){ done() }, function(){
            assert.equal(true, false, "Should not fire error callback");
        });
    });

    it("should fire the error callback when the endpoint is not valid", function(done){
        BaseModel.prototype.sync("http://localhost:3000/api/not_a_valid_endpoint", function(){
            // Should not reach this
            assert.equal(true, false, "Should not fire done callback");
        }, function(){ done() });
    });
});

describe("Hitting several endpoints", function(){

    it("should get the categories data, the product collection for a category and then details for the a product", function(done){
        var categoriesModel = new CategoriesModel();
        categoriesModel.rootUrl = "http://localhost:3000/api/";
        categoriesModel.onChange.subscribe(function(ctx){
            // Do a sanity check to confirm that it's getting the proper JSON
            assert.equal(ctx.data.Brand, "BestBuyCanada");
            assert.equal(ctx.data.name, "Departments");
            assert.equal(typeof(ctx.data.subCategories.length), "number");
            assert.equal(typeof(ctx.data.subCategories[0].name), "string");

            // Get the first subcategory
            var subCategory = categoriesModel.getSubCategoryByIndex(0);

            // Fetch the products for that subcategory
            var productCollection = subCategory.getProductCollection();
            productCollection.rootUrl = "http://localhost:3000/api/";

            productCollection.onChange.subscribe(function(ctx){
                // Do a sanity check to confirm that it's getting the proper JSON
                assert.equal(ctx.data.Brand, "BestBuyCanada");
                assert.equal(typeof(ctx.data.products.length), "number");
                assert.equal(typeof(ctx.data.products[0].name), "string");
                assert.equal(typeof(ctx.data.products[0].isAdvertised), "boolean");

                // Now get the details for that specific product
                var product = productCollection.getProductByIndex(0);
                var productDetails = product.getProductDetails();
                productDetails.rootUrl = "http://localhost:3000/api/";

                productDetails.onChange.subscribe(function(ctx){

                    // Do a sanity check to confirm that it's getting the proper JSON data
                    assert.equal(typeof("name"), "string");
                    assert.equal(typeof(ctx.data.specs.length), "number");
                    assert.equal(typeof(ctx.data.specs[0].group), "string");
                    assert.equal(typeof(ctx.data.isSpecialDelivery), "boolean");
                    done();
                });
                productDetails.fetch();
            });
            productCollection.fetch();
        });
        categoriesModel.fetch();
    });

    it("Should fire the error event when attempting to fetch a bad URL", function(done){
        var categoriesModel = new CategoriesModel();
        categoriesModel.url = "/not_a_valid_endpoint";
        categoriesModel.onError.subscribe(function(ctx){
            done();
        });
        categoriesModel.fetch();
    });
});