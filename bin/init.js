
/* dependencies */

var inquirer = require('inquirer');
var shell = require('gulp-shell');
var path = require('path');
var gulp = require('gulp');
var fs = require('fs');

/* toybox init */

module.exports = function() {
  console.log('');
  inquirer.prompt([{type:'input', name:'username', message:'Enter Github username!'}, {type:'input', name:'date', message:'When did you start @ HR? (2015-02, 2014-12, etc)'}], function(answers) {
    console.log('');
    gulp.task('Copying files', copyFiles());
    gulp.task('Installing dependencies', ['Copying files'], npmInstall());
    gulp.task('Cloning repo', ['Installing dependencies'], gitClone(answers.username, answers.date));
    gulp.task('Adding upstream remote', ['Cloning repo'], remoteAdd(answers.date));
    gulp.task('Copying tests', ['Adding upstream remote'], copyTests())
      .start(function() {
        console.log('');
        console.log('Done! Now cd into "toybox"'.grey);
        console.log('and run '.grey + 'toybox '.green + 'start'.blue);
        console.log('');
      });
  });
  gulp.on('task_start', function(e){
    console.log(e.task.grey + '...'.grey);
  });
};

/* methods */

// Copies needed files from bin to location command is run
function copyFiles() {
  return function() {
    var toybox = path.join(__dirname, '../lib/toybox/**/*');
    return gulp.src(toybox)
      .pipe(gulp.dest(process.cwd() + '/toybox'));
  };
}

// Runs npm install inside the toybox
function npmInstall() {
  return shell.task([
    'cd toybox && npm install'
  ], {quiet: true});
}

// Clones the repo with the given data into the toybox
function gitClone(username, date) {
  return shell.task([
    'git clone https://github.com/' + username + '/' + date + '-toy-problems.git toybox/toy-problems-repo'
  ], {quiet: true});
}

// Adds the remote upstream to the toy-problems-repo
function remoteAdd(date) {
  return shell.task([
    'cd toybox/toy-problems-repo/ && git remote add upstream https://github.com/hackreactor/' + date + '-toy-problems.git'
  ], {quiet: true});
}

// Copies test file into toy-problems-repo
function copyTests() {
  if (!fs.existsSync(process.cwd() + '/toybox/toy-problems-repo/tests.js')) {
    return function() {
      var test = path.join(__dirname, '../lib/tests.js');
      return gulp.src(test)
        .pipe(gulp.dest(process.cwd() + '/toybox/toy-problems-repo'));
    };
  } else return;
}
