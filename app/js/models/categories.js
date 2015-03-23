var BaseModel = require("./baseModel");
var subCategory = require("./subCategory");

function Categories(){
    BaseModel.call(this);
};

Categories.prototype = Object.create(BaseModel.prototype);

Categories.prototype.url = "Category/departments";

Categories.prototype.getSubCategoryByIndex = function(index){
    return new subCategory(this.data.subCategories[index]);
};

module.exports = Categories;