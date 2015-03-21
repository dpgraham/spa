var assert = require("assert");
var BaseView = require("../../../app/js/views/baseView");

describe('render event testing', function(){

    describe('calling fetch on the base model', function(){

        it("should render the element based on the data", function(){
            // Override sync. Always returns a unique number
            var view = new BaseView();
            view.template = require("./fixtures/basic_template.html");
            view.el = document.createElement("div");
            view.model = {
                data: {
                    dataVar: "Hello World!"
                }
            };

            // Render the data and then check the elements inner HTML
            view.render();
            assert.equal(view.el.innerHTML, "<p>Hello World!</p>");

            // Change the data and then render it again
            view.model.data.dataVar = "Hello whirl!";
            view.render();
            assert.equal(view.el.innerHTML, "<p>Hello whirl!</p>");
        });
    });

});