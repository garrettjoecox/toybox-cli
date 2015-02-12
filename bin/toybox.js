#!/usr/bin/env node

/*
 * toybox-cli
 * https://github.com/garrettjoecox/toybox-cli
 *
 * Copyright (c) 2015, Garrett Cox
 * Licensed under the MIT license.
 */

/**
 * Module dependencies.
 */

var program = require('commander'),
    updateNotifier = require('update-notifier'),
    Insight = require('insight'),
    _ = require('underscore'),
    banner = require('../lib/banner.js'),
    Api = require('..'),
    api = new Api('access_token'),
    path = require('path'),
    debug = require('../lib/debugger.js'),
    pkg = require('../package.json'),
    gulp = require('gulp'),
    fs = require('fs'),
    gulpGulp = require('gulp-gulp'),
    ginstall = require('gulp-install'),
    sequence = require('gulp-sequence'),
    shell = require('gulp-shell'),
    inquirer = require('inquirer')

require('colors');

program
    .command('new')
    .action(function(){
        inquirer.prompt([{type:'input',name:'username',message:'Please enter Github username!'}], function(answers){
            gulp.task('copy', copy())
            gulp.task('clone', clone(answers.username)).start();
        })
    })

program
    .command('start')
    .action(function(){
        if(fs.existsSync(process.cwd()+'/gulpfile.js')){
            gulp.task('runGulpFile', runGulp()).start();
        }else{
            console.log("You're not in a ToyBox!".bold.red);
            console.log("run 'ToyBox new'".grey);
        }
    });

if(process.argv.length === 2){
    console.log("Thanks for using Toybox! (By Garrett Cox)".grey);
    console.log("Run 'toybox new' to get started!".grey);
}

function runGulp(){
    return function(){
        return gulp.src(process.cwd()+'/gulpfile.js')
            .pipe(gulpGulp());
    }
}

function clone(username){
    return shell.task([
        'git clone https://github.com/' + username + '/2015-02-toy-problems.git ToyBox/2015-02-toy-problems'
    ]);
}

function copy(){
    return function(){
        var toybox = path.join(__dirname, '../lib/ToyBox/**/*');
        return gulp.src(toybox)
            .pipe(gulp.dest(process.cwd()+'/ToyBox'))
            .pipe(ginstall());
    }
}



program.parse(process.argv);