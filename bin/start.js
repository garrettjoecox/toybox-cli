
/* dependencies */

var gulpGulp = require('gulp-gulp');
var shell = require('gulp-shell');
var gulp = require('gulp');
require('colors');

/* toybox init */

module.exports = function() {
  if (process.cwd().split('/').pop() === 'toybox') {
    gulp.task('openSubl', openSubl());
    gulp.task('runGulp', runGulp()).start();
  } else {
    require('./help')();
    console.log("You're not in a toybox!".red);
    console.log('');
  }
};

// Opens toy-problems-repo with sublime
function openSubl() {
  return shell.task([
    'open -a "Sublime Text" toy-problems-repo'
  ], {ignoreErrors: true});
}

// Runs default gulp command
function runGulp() {
  return function() {
    return gulp.src(process.cwd() + '/gulpfile.js')
      .pipe(gulpGulp());
  };
}