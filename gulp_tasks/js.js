var browserify = require("browserify");
var gulp = require("gulp");
var gulpUtil = require("gulp-util");
var hbsfy = require("hbsfy").configure({
    extensions: ["html"]
});;
var source = require('vinyl-source-stream');
var minifyify = require('minifyify');

gulp.task("js", function(){
    var out = browserify('./app/js/main.js', {debug: !gulpUtil.env.minify});

    if(gulpUtil.env.minify){
        out.plugin("minifyify", {map: false});
    }

    out.transform(hbsfy);

    // Bundle it and push it to the ./dist folder
    out.bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest("./dist"));

    return out;
});