var BaseModel = require("./baseModel");
var ProductDetails = require("./productDetails");

var Products = function(data){
    this.data = data;
    this.id = data.sku;
};

Products.prototype = new BaseModel();

Products.prototype.getProductDetails = function(){
    return new ProductDetails(this.id);
};

module.exports = Products;