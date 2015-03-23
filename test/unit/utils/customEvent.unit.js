var assert = require("assert"),
    customEvent = require("../../../app/js/utils/customEvent");

describe('when you subscribe to an event', function(){
    describe('once', function(){
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

    describe('multiple times', function(){
        it("should fire multiple callbacks when you trigger an event", function(done){
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

describe('when you unsubscribe an event', function(){

    describe('if just one callback was subscribed', function(){
        it('should not fire that callback', function(){
            var event = new customEvent();
            var cb = function(){
                assert.equal(true, false, "Should not reach this function, should be unsubscribed");
            };
            event.subscribe(cb);
            event.unsubscribe(cb);
            event.trigger();
        });
    });

    describe('and there were multiple callbacks subscribed to it', function(){
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

    describe('for one callback but not another', function(){
        it('should still fire the one callback', function(done){
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