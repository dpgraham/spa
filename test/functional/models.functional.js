var CategoriesModel = require("../../app/js/models/categories");
var assert = require("assert");

describe("Hitting several endpoints", function(){

    it("Should fetch data from the categories API endpoint and trigger a change event", function(done){
        var categoriesModel = new CategoriesModel();
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
            productCollection.onChange.subscribe(function(ctx){
                // Do a sanity check to confirm that it's getting the proper JSON
                assert.equal(ctx.data.Brand, "BestBuyCanada");
                assert.equal(typeof(ctx.data.products.length), "number");
                assert.equal(typeof(ctx.data.products[0].name), "string");
                assert.equal(typeof(ctx.data.products[0].isAdvertised), "boolean");

                // Now get the details for that specific product
                var product = productCollection.getProductByIndex(0);
                var productDetails = product.getProductDetails();
                productDetails.onChange.subscribe(function(ctx){

                    // Do a sanity check to confirm that it's getting the proper JSON
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