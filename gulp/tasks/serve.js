var gulp = require('gulp');

gulp.task('serve', ['connect', 'watch'], function () {
  require('opn')('http://localhost:9000/login');
});

gulp.task('serve:dist', ['connect:dist'], function () {
  require('opn')('http://localhost:9000/login');
});
