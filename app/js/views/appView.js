var baseView = require("./baseView");
var template = require("../templates/app.html");

var AppView = function(el){
    // Temporarily assign the model as an inline object
    this.model = {
        data: []
    }
    this.template = template;
    this.el = el;
};

AppView.prototype = new baseView();

module.exports = AppView;