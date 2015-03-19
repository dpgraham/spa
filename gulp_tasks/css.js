var gulp = require("gulp");
var less = require("gulp-less");

gulp.task('css', function () {
    return gulp.src('./app/css/**/*.css')
        .pipe(less())
        .pipe(gulp.dest('./dist'));
});