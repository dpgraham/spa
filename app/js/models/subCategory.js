var BaseModel = require("./baseModel");
var products = require("./products");

var SubCategory = function(data){
    this.data = data;
};

SubCategory.prototype = new BaseModel();

SubCategory.prototype.getProductCollection = function(){
    return new products(this.data.id);
};

module.exports = SubCategory;