var mochify = require("mochify");
var gulp = require("gulp");
var server = require("../server");
var through2 = require("through2");

gulp.task("test", function(){
    var bundle = mochify("./test/**/*.js", {
    }).bundle();

    // Closes the server when the tests are complete
    bundle.on("end", server.close);
});