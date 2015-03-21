var BaseModel = require("./baseModel");

var ProductDetails = function(id){
    this.id = id;
    this.url = "product/" + this.id;
};

ProductDetails.prototype = new BaseModel();

module.exports = ProductDetails;