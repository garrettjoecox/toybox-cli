#!/usr/bin/env node

require('colorslite');

var commands = {
    init: true,
    help: true,
    start: true,
    pull: true,
    push: true
};

if (commands[process.argv[2]]) require('./'+process.argv[2])();
else require('./help')();
