
/* dependencies */

var shell = require('gulp-shell');
var gulp = require('gulp');
require('colors');

/* toybox push */

module.exports = function() {
  if (process.cwd().split('/').pop() === 'toybox') {
    gulp.task('pull', shell.task([
      'cd toy-problems-repo && git pull upstream master'
    ])).start();
  } else {
    require('./help')();
    console.log("You're not in a toybox!".red);
    console.log('');
  }
};
