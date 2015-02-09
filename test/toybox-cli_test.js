/*
 * toybox-cli
 * https://github.com/garrettjoecox/toybox-cli
 *
 * Copyright (c) 2015, Garrett Cox
 * Licensed under the MIT license.
 */

'use strict';

var chai = require('chai');
chai.expect();
chai.should();

var Api = require('../lib/toybox-cli.js');
var api = new Api('access_token');

describe('toybox-cli module', function() {
    describe('#constructor()', function() {
        it('should be a function', function() {
            Api.should.be.a("function");
        });
    });
    describe('#instance()', function() {
        it('should be a object', function() {
            api.should.be.a("object");
        });
    });
});

