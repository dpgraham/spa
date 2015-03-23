var BaseModel = require("./baseModel");
var products = require("./products");

function SubCategory(data){
    BaseModel.call(this);
    this.data = data;
};

SubCategory.prototype = Object.create(BaseModel.prototype);

SubCategory.prototype.getProductCollection = function(){
    return new products(this.data.id);
};

module.exports = SubCategory;