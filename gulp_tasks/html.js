var gulp = require("gulp");

gulp.task("html", function(){
    gulp.src("./app/html/**/*.html").pipe(gulp.dest("./dist"));
});