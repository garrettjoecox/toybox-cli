
/* dependencies */

var inquirer = require('inquirer');
var shell = require('gulp-shell');
var gulp = require('gulp');
require('colors');

/* toybox push */

module.exports = function() {
  if (process.cwd().split('/').pop() === 'toybox') {
    inquirer.prompt([{type:'input', name:'commit', message:'Enter commit message for GitHub!'}], function(answers) {
      gulp.task('pull', shell.task([
        'cd toy-problems-repo && git add .; git commit -m "' + answers.commit + '"; git push origin master'
      ])).start();
    });
  } else {
    require('./help')();
    console.log("You're not in a toybox!".red);
    console.log('');
  }
};
