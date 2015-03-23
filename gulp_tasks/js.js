var browserify = require("browserify");
var gulp = require("gulp");
var gulpUtil = require("gulp-util");
var hbsfy = require("hbsfy").configure({
    extensions: ["html"]
});;
var source = require('vinyl-source-stream');
var minifyify = require('minifyify');

gulp.task("js", function(){
    var out = browserify('./app/js/main.js', {debug: !!gulpUtil.env.debug})
        .require("./app/js/config/config", {expose: 'config'});

    if(gulpUtil.env.minify){
        var minifyifyObj = {};
        minifyifyObj.map = !!gulpUtil.env.debug;
        if(gulpUtil.env.debug){
            minifyifyObj.output = "./dist/bundle.map.js";
        }
        out.plugin("minifyify", minifyifyObj);
    }

    out.transform(hbsfy);

    // Bundle it and push it to the ./dist folder
    out.bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest("./dist"));

    return out;
});