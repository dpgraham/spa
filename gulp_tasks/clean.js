var gulp = require("gulp");
var gulpRimraf = require("gulp-rimraf");

gulp.task("clean", function(){
    return gulp.src("./dist").pipe(gulpRimraf());
});