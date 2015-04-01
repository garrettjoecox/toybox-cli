#!/usr/bin/env node

var gulpGulp = require('gulp-gulp');
var inquirer = require('inquirer');
var shell = require('gulp-shell');
var path = require('path');
var gulp = require('gulp');
var fs = require('fs');
require('colors');

var commands = {
    init: init,
    help: help,
    start: start,
    pull: pull,
    push: push
};

if (commands[process.argv[2]]) commands[process.argv[2]]();
else help();

/*  Commands  */

// Displays commands
function help() {
    console.log('');
    console.log('Thanks for using toybox <3 (By Garrett Cox)'.grey);
    console.log('');
    console.log('toybox '.green + 'init'.blue + ' - initalize a toybox'.grey);
    console.log('toybox '.green + 'start'.blue + ' - start a livereload watching the toybox'.grey);
    console.log('toybox '.green + 'pull'.blue + " - pull new problems from HR's upstream".grey);
    console.log('toybox '.green + 'push'.blue + ' - push changes to your toy problems repo'.grey);
    console.log('');
}

// Initializes a toybox
function init() {
    console.log('');
    inquirer.prompt([{type:'input', name:'username', message:'Enter Github username!'}, {type:'input', name:'date', message:'When did you start @ HR? (2015-02, 2014-12, etc)'}], function(answers) {
        console.log('');

        gulp.task('copyFilesLog', function() { console.log('Copying files...'.grey); } );
        gulp.task('copyFiles', ['copyFilesLog'], copyFiles());

        gulp.task('npmInstallLog', ['copyFiles'], function() { console.log('Installing dependencies...'.grey); } );
        gulp.task('npmInstall', ['npmInstallLog'], npmInstall());

        gulp.task('gitCloneLog', ['npmInstall'], function() { console.log('Cloning github repo...'.grey); } );
        gulp.task('gitClone', ['gitCloneLog'], gitClone(answers.username, answers.date));

        gulp.task('remoteAddLog', ['gitClone'], function() { console.log('Adding upstream remote...'.grey); } );
        gulp.task('remoteAdd', ['remoteAddLog'], remoteAdd(answers.date));

        gulp.task('copyTestsLog', ['remoteAdd'], function() { console.log('Copying tests...'.grey); } );
        gulp.task('copyTests', ['copyTestsLog'], copyTests())

            .start(function() {
                console.log('');
                console.log('Done! Now cd into "toybox"'.grey);
                console.log('and run '.grey + 'toybox '.green + 'start'.blue);
                console.log('');
            });
    });
}

// Starts a livereload server on the current toybox
function start() {
    if (process.cwd().split('/').pop() === 'toybox') {
        gulp.task('openSubl', openSubl());
        gulp.task('runGulp', runGulp()).start();
    } else {
        help();
        console.log("You're not in a toybox!".red);
        console.log('');
    }
}

/*  Methods  */

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

// Opens toy-problems-repo with sublime
function openSubl() {
    return shell.task([
        'subl toy-problems-repo'
    ], {ignoreErrors: true});
}

// Runs default gulp command
function runGulp() {
    return function() {
        return gulp.src(process.cwd() + '/gulpfile.js')
            .pipe(gulpGulp());
    };
}

// Pulls new problems from Hack Reactor's upstream
function pull() {
    if (process.cwd().split('/').pop() === 'toybox') {
        gulp.task('pull', shell.task([
            'cd toy-problems-repo && git pull upstream master'
        ])).start();
    } else {
        help();
        console.log("You're not in a toybox!".red);
        console.log('');
    }
}

// Prompts for commit message and pushes changes to origin master
function push() {
    if (process.cwd().split('/').pop() === 'toybox') {
        inquirer.prompt([{type:'input', name:'commit', message:'Enter commit message for GitHub!'}], function(answers) {
            gulp.task('pull', shell.task([
                'cd toy-problems-repo && git add .; git commit -m "' + answers.commit + '"; git push origin master'
            ])).start();
        });
    } else {
        help();
        console.log("You're not in a toybox!".red);
        console.log('');
    }
}
