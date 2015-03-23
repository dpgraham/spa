var mochify = require("mochify");
var gulp = require("gulp");
var gulpUtil = require("gulp-util");
var through2 = require("through2");
var hbsfy = require("hbsfy").configure({
    extensions: ["html"]
});;

gulp.task("test", function(){
    var server = require("../server");
    var bundle = mochify(gulpUtil.env.glob || "./test/**/*.js", {})
        .require("./app/js/config/testConfig", {expose: 'config'})
        .transform(hbsfy).bundle();

    // Closes the server when the tests are complete
    bundle.on("end", server.close);
});