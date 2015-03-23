var assert = require("assert");
var BaseModel = require("../../../app/js/models/baseModel");

describe('when you create a new model', function(){

    describe('if you call the fetch event twice and the model\'s data changes', function(){

        // Override sync. Always returns a unique number
        var model = new BaseModel();
        var counter = 0;
        model.sync = function(url, doneCb){
            setTimeout(function(){
                doneCb({
                    data: ++counter
                })
            }, 1);
        };

        it("should fire the change callback twice", function(done){
            model.onChange.subscribe(function(ctx){
                assert.equal(ctx, model);
                assert.equal(ctx.data, 1);
            });
            model.fetch();
            model.onChange.unsubscribe();

            setTimeout(function(){
                model.onChange.subscribe(function(ctx){
                    assert.equal(ctx.data, 2);
                    done();
                });
                model.fetch();
            }, 10);
        });

    });

    describe('if you call the fetch event twice but the data doesn\'t change', function(){

        // Override sync. Always returns same value
        var model = new BaseModel();
        model.sync = function(url, doneCb){
            setTimeout(function(){
                doneCb({
                    data: '{"val1":"hello","val2":"world"}'
                })
            }, 1);
        };

        it("should call change after first fetch but not second fetch", function(done){
            var counter = 0;
            model.onChange.subscribe(function(ctx){
                counter++;
                if(counter == 2){
                    assertTrue(false);
                }
                assert.equal(ctx.data.val1, "hello");
                assert.equal(ctx.data.val2, "world");
            });
            model.fetch();
            model.fetch();

            // Call done 20ms after second fetch to verify that change event didn't fire second time
            setTimeout(done, 20);
        });
    });

    describe('if you call a fetch event and it throws an error', function(){

        // Override sync to always fire an error
        var model = new BaseModel();
        var ERR_MESSAGE = "An error has occurred";
        model.sync = function(url, doneCb, errCb){
            setTimeout(function(){
                errCb(ERR_MESSAGE);
            }, 1);
        };

        it("should fire error event for that object and the global error event", function(done){
            var i = 0;
            model.onError.subscribe(function(ctx){
                assert.equal(ctx, ERR_MESSAGE);
                if(++i == 2) done();
            });
            BaseModel.onError.subscribe(function(ctx){
                assert.equal(ctx, ERR_MESSAGE);
                if(++i == 2) done();
            });
            model.fetch();
        });
    });

    describe('if you initialize the model with data and the fetch event doesn\'t change the data', function(){

        // Override sync. Always returns same value
        var initData = {
            val1: 'hello',
            val2: 'world'
        };

        var model = new BaseModel(initData);
        model.sync = function(url, doneCb){
            setTimeout(function(){
                doneCb({
                    data: '{"val1":"hello","val2":"world"}'
                })
            }, 1);
        };

        it("should not fire change event", function(done){
            model.onChange.subscribe(function(ctx){
                assert.equal(ctx, ERR_MESSAGE);
                done();
            });
            model.fetch();
            setTimeout(done, 20);
        });
    });



});