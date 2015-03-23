var BaseModel = require("./baseModel");

function ProductDetails(id){
    BaseModel.call(this);
    this.id = id;
    this.url = "product/" + this.id;
};

ProductDetails.prototype = Object.create(BaseModel.prototype);

module.exports = ProductDetails;