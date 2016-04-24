var gulp = require('gulp');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');

var appFolder = 'public/'

gulp.task('compileSass', function() {
    // Compile Sass here
    return gulp.src(appFolder + 'scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(rename('style.css'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(appFolder + 'css'));
});

gulp.task('default', function() {
    gulp.watch(appFolder + 'scss/**/*.scss', ['compileSass'])
});