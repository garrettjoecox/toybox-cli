(function(){
  var gulp  = require('gulp');
  var livereload = require('gulp-livereload');
  var sequence = require('gulp-sequence');

  gulp.task('default', ['Starting', 'ToyBox']);

  gulp.task('Starting', function(){require('./server')});

  gulp.task('ToyBox', function(){
    livereload({ start: true, quiet:true });
    gulp.watch('./client/**/*.css', livereload.changed);
    gulp.watch('./client/**/*.js', livereload.changed);
    gulp.watch('./client/**/*.html', livereload.changed);
  });
})();