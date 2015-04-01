(function(){
  var gulp  = require('gulp');
  var livereload = require('gulp-livereload');
  var sequence = require('gulp-sequence');
  var inject = require('gulp-inject');

  gulp.task('index', function () {
    var target = gulp.src('./index.html');
    var sources = gulp.src(['./toy-problems-repo/**/*.js', './src/**/*.css'], {read: false});
    return target.pipe(inject(sources))
      .pipe(gulp.dest('./'));
  });

  gulp.task('default', ['Starting', 'ToyBox', 'index']);

  gulp.task('Starting', function(){require('./server');});

  gulp.task('ToyBox', function(){
    livereload();
    livereload.listen();
    gulp.watch('./toyboxtests.js', livereload.changed);
    gulp.watch('./toy-problems-repo/**/*.js', livereload.changed);
    gulp.watch('./index.html', livereload.changed);
  });
})();