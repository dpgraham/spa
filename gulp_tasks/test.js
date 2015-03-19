var mochify = require("mochify"),
    gulp = require("gulp");

gulp.task("test", function(){
    mochify("./test/**/*.js", {

    }).bundle();
});