var assert = require("assert"),
    customEvent = require("../../../app/js/utils/customEvent");

describe('subscribe', function(){
    describe('one callback', function(){
        it("should fire one callback when you trigger an event and have the correct arguments", function(done){
            var event = new customEvent();
            event.subscribe(function(){
                assert.equal(arguments[0], "hello");
                assert.equal(arguments[1], "world");
                done();
            });

            setTimeout(function(){
                event.trigger("hello", "world");
            }, 0);
        });
    });

    describe('multiple callbacks', function(){
        it("should fire multiple callbacks when you trigger an event and have the correct arguments", function(done){
            var event = new customEvent();
            var callbacks = 0;

            event.subscribe(function(){
                assert.equal(arguments[0], "hello");
                assert.equal(arguments[1], "world");
                if(callbacks++ == 2)
                    done();
            });

            event.subscribe(function(){
                assert.equal(arguments[0], "hello");
                assert.equal(arguments[1], "world");
                if(callbacks++ == 2)
                    done();
            });

            event.subscribe(function(){
                assert.equal(arguments[0], "hello");
                assert.equal(arguments[1], "world");
                if(callbacks++ == 2)
                    done();
            });

            setTimeout(function(){
                event.trigger("hello", "world");
            }, 0);
        });
    });
});

describe('test the unsubscribe method by', function(){

    describe('subscribing and unsubscribing one callback', function(){
        it('should not fire the callback when triggering', function(){
            var event = new customEvent();
            var cb = function(){
                assert.equal(true, false, "Should not reach this function, should be unsubscribed");
            };
            event.subscribe(cb);
            event.unsubscribe(cb);
            event.trigger();
        });
    });

    describe('subscribing multiple callbacks and then unsubscribing all of them', function(){
        it('should not fire any of the callbacks when triggering', function(){
            var event = new customEvent();
            var cb1 = function(){
                assert.equal(true, false, "Should not reach this function, should be unsubscribed");
            };
            var cb2 = function(){
                assert.equal(true, false, "Should not reach this function, should be unsubscribed");
            };
            event.subscribe(cb1);
            event.subscribe(cb2);
            event.unsubscribe();
            event.trigger();
        });
    });

    describe('subscribing multiple callbacks and then unsubscribing only one of them', function(){
        it('should only fire the one callback', function(done){
            var event = new customEvent();
            var cb1 = function(){
                assert.equal(true, false, "Should not reach this function, should be unsubscribed");
            };
            var cb2 = function(){
                assert.equal(arguments[0], "foobar", "This should be reached");
                done();
            };
            event.subscribe(cb1);
            event.subscribe(cb2);
            event.unsubscribe(cb1);
            event.trigger("foobar");
        });
    });

});