var gulp = require('gulp');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');

var appFolder = 'public/'

gulp.task('sass', function() {
    // Compile Sass here
    return gulp.src(appFolder + 'scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(rename('style.css'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(appFolder + 'dist/css'));
});

gulp.task('js', function() {
    return gulp.src(appFolder + 'scripts/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(concat({path: 'app.js'}))
    // .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(appFolder + 'dist/js'));
});

gulp.task('default', function() {
    gulp.watch(appFolder + 'scss/**/*.scss', ['sass'])
    gulp.watch(appFolder + 'scripts/**/*.js', ['js'])
});