#!/usr/bin/env node

var sequence = require('gulp-sequence');
var ginstall = require('gulp-install');
var gulpGulp = require('gulp-gulp');
var program = require('commander');
var inquirer = require('inquirer');
var shell = require('gulp-shell');
var path = require('path');
var gulp = require('gulp');
var fs = require('fs');
require('colors');

if(process.argv.length < 3){
    console.log("Thanks for using toybox! (By Garrett Cox)".grey);
    console.log("Run 'toybox init' to get started!".grey);
}

program
    .command('init')
    .action(function(){
        inquirer.prompt([{type:'input',name:'username',message:'Enter Github username!'},{type:'input',name:'date',message:'When did you start @ HR? (2015-02, 2014-12, etc)'}], function(answers){
            gulp.task('copy', copy());
            gulp.task('git', git(answers.username, answers.date)).start();
        });
    });

program
    .command('start')
    .action(function(){
        if(fs.existsSync(process.cwd()+'/gulpfile.js')){
            gulp.task('open', open());
            gulp.task('runGulpFile', runGulp()).start();
        }else{
            console.log("You're not in a toybox!".bold.red);
            console.log("run 'toybox init'".grey);
        }
    });

program
    .command('pull')
    .action(function(){
        gulp.task('pull', pull()).start();
    });

program
    .command('push')
    .action(function(){
        inquirer.prompt([{type:'input', name:'commit', message:'Enter commit message for GitHub!'}], function(answers){
            gulp.task('push', push(answers.commit)).start();
        });
    });

function copy(){
    return function(){
        var toybox = path.join(__dirname, '../lib/toybox/**/*');
        return gulp.src(toybox)
            .pipe(gulp.dest(process.cwd()+'/toybox'))
            .pipe(ginstall());
    };
}

function git(username, date){
    return shell.task([
        'git clone https://github.com/' + username + '/' + date + '-toy-problems.git toybox/toy-problems-repo; cd toybox/toy-problems-repo/ && git remote add upstream https://github.com/hackreactor/' + date + '-toy-problems.git'
    ]);
}

function open(){
    return shell.task([
        'subl toy-problems-repo'
    ]);
}

function runGulp(){
    return function(){
        return gulp.src(process.cwd()+'/gulpfile.js')
            .pipe(gulpGulp());
    };
}

function pull(){
    return shell.task([
        'cd toy-problems-repo && git pull upstream master'
    ]);
}

function push(commit){
    return shell.task([
        'cd toy-problems-repo && git add .; git commit -m "' + commit + '"; git push origin master'
    ]);
}

program.parse(process.argv);