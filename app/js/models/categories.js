var BaseModel = require("./baseModel");

var Categories = function(){

};

Categories.prototype = new BaseModel();

Categories.prototype.url = "Category/departments";

module.exports = Categories;