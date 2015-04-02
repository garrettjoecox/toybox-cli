
var livereload = require('gulp-livereload');
var inject = require('gulp-inject');
var open = require('gulp-open');
var gulp  = require('gulp');

gulp.task('default', ['server', 'watch', 'inject', 'open']);

gulp.task('server', function(){require('./server');});

gulp.task('watch', function(){
  livereload();
  livereload.listen();
  gulp.watch('./toy-problems-repo/**/*.js', livereload.changed);
});

gulp.task('open', function(){
  var options = {
    url: 'http://localhost:9000',
    app: 'google chrome'
  };
  gulp.src('./index.html')
    .pipe(open('', options));
});

gulp.task('inject', function () {
  var target = gulp.src('./index.html');
  var sources = gulp.src(['./toy-problems-repo/**/*.js', './src/**/*.css'], {read: false});
  return target.pipe(inject(sources))
    .pipe(gulp.dest('./'));
});
