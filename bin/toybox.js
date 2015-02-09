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
    install = require('gulp-install'),
    sequence = require('gulp-sequence')

require('colors');

program
    .command('new [name]')
    .action(function(){
        if (!this.args[0]){
            return console.log("Please specify a name!".bold.red);
        };

        gulp.task('copy', function(){
            var templates = path.join(__dirname, '../lib/ToyBox/**/*');
            templates = [templates].concat(path.join(__dirname, '../lib/ToyBox/**/.*'));
            return gulp.src(templates)
                .pipe(gulp.dest(process.cwd()+'/'+program.args[0]))
                .pipe(install()).on('end', function(){
                    console.log('Done! Run "toybox" inside the '.grey + program.args[0].grey + ' directory and'.grey)
                    console.log("drag the ".grey + program.args[0].grey + "/client/ to sublime to get started!".grey);
                })
        }).start();
    });

if(process.argv.length === 2){
    if(fs.existsSync(process.cwd()+'/.toybox')){
        gulp.task('runGulpFile', function(){
            return gulp.src(process.cwd()+'/gulpfile.js')
                .pipe(gulpGulp());
        }).start();
    }else{
        console.log("You're not in a ToyBox!".bold.red);
        console.log("run 'ToyBox new [name]'".grey);
    }
}


program.parse(process.argv);