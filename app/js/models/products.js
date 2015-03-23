var BaseModel = require("./baseModel");
var Product = require("./product");

function Products(id){
    BaseModel.call(this);
    this.id = id;
    this.url = "search?categoryid=" + this.id;
};

Products.prototype = Object.create(BaseModel.prototype);

Products.prototype.getProductByIndex = function(index){
    return new Product(this.data.products[index]);
};

module.exports = Products;