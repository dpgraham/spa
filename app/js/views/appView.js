var baseView = require("./baseView");
var template = require("../templates/app.html");
var categoriesView = require("./categoriesView");
var BaseModel = require("../models/baseModel");

var AppView = function(el){
    this.template = template;
    this.el = el;
    this.render();
    var sidebarEl = document.getElementById("sidebar");

    // If there's a network error, show the error message
    BaseModel.onError.subscribe(function(){
        document.getElementById("error_message").className = "alert alert-danger";
    });

    this.categoriesView = new categoriesView(sidebarEl);
};

AppView.prototype = new baseView();

module.exports = AppView;