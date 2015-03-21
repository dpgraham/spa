var BaseModel = require("./baseModel");

var Categories = function(){

};

Categories.prototype = new BaseModel();

Categories.prototype.url = this.rootUrl + "/json/Category/departments";

module.exports = Categories;