var browserify = require("browserify");
var gulp = require("gulp");
var gulpUtil = require("gulp-util");
var uglifyify = require("uglifyify");
var hbsfy = require("hbsfy").configure({
    extensions: ["html"]
});;
var source = require('vinyl-source-stream');

gulp.task("js", function(){
    var out = browserify('./app/js/main.js', {debug: !gulpUtil.env.minify});

    out.transform(hbsfy);

    // If the minify flag is set, then uglify the Javascript
    if(gulpUtil.env.minify){
        out.transform(uglifyify);
    }


    // Bundle it and push it to the ./dist folder
    out.bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest("./dist"));

    return out;
});