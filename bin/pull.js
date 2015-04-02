
/* dependencies */

var shell = require('gulp-shell');
require('colors');

/* toybox push */

module.exports = function() {
  if (process.cwd().split('/').pop() === 'toybox') {
    gulp.task('pull', shell.task([
      'cd toy-problems-repo && git pull upstream master'
    ])).start();
  } else {
    help();
    console.log("You're not in a toybox!".red);
    console.log('');
  }
};
