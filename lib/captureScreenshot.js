'use strict';

var validUrl = require('valid-url');
var webshot = require('webshot');
/**
 *
 * @param {object} options
 * @param {string} options.filename
 * @param {string} options.url
 * @param {callback} callback
 * @returns {*}
 */
function captureScreenshot(options, callback) {
  if (!options) {
    return callback(new Error('Missing required input: options'), null);
  }

  if (!options.filename) {
    return callback(new Error('Missing required input: options.filename'), null);
  }

  if (!options.url) {
    return callback(new Error('Missing required input: options.url'), null);
  }

  if (!validUrl.isWebUri(options.url)) {
    return callback(new Error('Invalid url: options.url'), null);
  }
  var webshotOptions = {
    shotSize : {
      width: 'all',
      height: 'all'
    }
  };
  webshot(options.url, options.filename, webshotOptions, function(err) {
    if (err) {
      return callback(err, null);
    } else {
      return callback(null, {message: 'Screenshot captured as: ' + options.filename});
    }
  });
}

module.exports = captureScreenshot;
