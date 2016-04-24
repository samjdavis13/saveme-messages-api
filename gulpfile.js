var gulp = require('gulp');
var rename = require('gulp-rename');
var sass = require('gulp-sass');

var appFolder = 'public/'

gulp.task('compileSass', function() {
    // Compile Sass here
    gulp.src(appFolder + 'scss/**/*.scss')
        .pipe(sass())
        .pipe(rename('style.css'))
        .pipe(gulp.dest(appFolder + 'css'));
});

gulp.task('default', function() {
    gulp.watch(appFolder + 'scss/**/*.scss', ['compileSass'])
});