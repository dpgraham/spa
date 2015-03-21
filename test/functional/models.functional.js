var CategoriesModel = require("../../app/js/models/categories");
var assert = require("assert");

describe("Hitting several endpoints", function(){

    it("Should fetch data from the API endpoint and trigger a change event", function(done){
        var categoriesModel = new CategoriesModel();
        categoriesModel.onChange.subscribe(function(ctx){
            // Do a sanity check to confirm that it's getting the proper JSON
            assert.equal(ctx.data.Brand, "BestBuyCanada");
            assert.equal(ctx.data.name, "Departments");
            assert.equal(typeof(ctx.data.subCategories.length), "number");
            assert.equal(typeof(ctx.data.subCategories[0].name), "string");
            done();
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