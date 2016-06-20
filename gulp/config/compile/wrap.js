var gulp = require('gulp');
var wrap = require('gulp-wrap');

gulp.task('wrap', function() {
  return gulp.src(['app/*.html','!app/layout.html'])
    .pipe(wrap({src: 'app/layout.html'}))
    .pipe(gulp.dest('dist'))
});