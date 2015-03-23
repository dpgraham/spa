var BaseModel = require("./baseModel");
var ProductDetails = require("./productDetails");

function Products(data){
    BaseModel.call(this, data);
    this.id = data.sku;
};

Products.prototype = Object.create(BaseModel.prototype);

Products.prototype.getProductDetails = function(){
    return new ProductDetails(this.id);
};

module.exports = Products;