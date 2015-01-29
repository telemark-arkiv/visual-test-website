'use strict';

var assert = require('assert');
var captureScreenshot = require('../lib/captureScreenshot');

describe('captureScreenshot', function() {

  it('it requires an options object', function(done) {

    var options = false;

    captureScreenshot(options, function(err, data) {
      assert.throws(function() {
          if (err) {
            throw err;
          } else {
            console.log(data);
          }
        }, function(err) {
          if ((err instanceof Error) && /Missing required input: options/.test(err)) {
            return true;
          }
        },
        'Unexpected error'
      );
      done();
    });
  });

  it('it requires an options.filename to exist', function(done) {

    var options = {
      filename: false
    };

    captureScreenshot(options, function(err, data) {
      assert.throws(function() {
          if (err) {
            throw err;
          } else {
            console.log(data);
          }
        }, function(err) {
          if ((err instanceof Error) && /Missing required input: options.filename/.test(err)) {
            return true;
          }
        },
        'Unexpected error'
      );
      done();
    });
  });

  it('it requires an options.url to exist', function(done) {

    var options = {
      filename: true,
      url: false
    };

    captureScreenshot(options, function(err, data) {
      assert.throws(function() {
          if (err) {
            throw err;
          } else {
            console.log(data);
          }
        }, function(err) {
          if ((err instanceof Error) && /Missing required input: options.url/.test(err)) {
            return true;
          }
        },
        'Unexpected error'
      );
      done();
    });
  });

  it('it requires an options.url to be a valid url', function(done) {

    var options = {
      filename: true,
      url: 'pysje'
    };

    captureScreenshot(options, function(err, data) {
      assert.throws(function() {
          if (err) {
            throw err;
          } else {
            console.log(data);
          }
        }, function(err) {
          if ((err instanceof Error) && /Invalid url: options.url/.test(err)) {
            return true;
          }
        },
        'Unexpected error'
      );
      done();
    });
  });
});
