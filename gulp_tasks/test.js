var mochify = require("mochify");
var gulp = require("gulp");
var through2 = require("through2");
var hbsfy = require("hbsfy").configure({
    extensions: ["html"]
});;

gulp.task("test", function(){
    var server = require("../server");
    var bundle = mochify("./test/**/*.js", {
    }).transform(hbsfy).bundle();

    // Closes the server when the tests are complete
    bundle.on("end", server.close);
});