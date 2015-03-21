var BaseModel = require("./baseModel");
var Product = require("./product");

var Products = function(id){
    this.id = id;
    this.url = "search?categoryid=" + this.id;
};

Products.prototype = new BaseModel();

Products.prototype.getProductByIndex = function(index){
    return new Product(this.data.products[index]);
};

module.exports = Products;