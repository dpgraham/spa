var BaseModel = require("./baseModel");
var subCategory = require("./subCategory");

var Categories = function(){

};

Categories.prototype = new BaseModel();

Categories.prototype.url = "Category/departments";

Categories.prototype.getSubCategoryByIndex = function(index){
    return new subCategory(this.data.subCategories[index]);
};

module.exports = Categories;