var gulp = require("gulp");

gulp.task("default", function(){
    gulp.start("clean", "js", "html", "css");
});