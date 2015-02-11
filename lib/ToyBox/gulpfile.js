(function(){
  var gulp  = require('gulp');
  var livereload = require('gulp-livereload');
  var sequence = require('gulp-sequence');

  gulp.task('default', ['Starting', 'ToyBox']);

  gulp.task('Starting', function(){require('./server')});

  gulp.task('ToyBox', function(){
    livereload();
    livereload.listen();
    gulp.watch('./ToyBoxTests.js', livereload.changed);
    gulp.watch('./2015-02-toy-problems/**/*.js', livereload.changed);
    gulp.watch('./index.html', livereload.changed);
  });
})();