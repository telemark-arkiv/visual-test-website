'use strict';

var action = process.argv[2];
var captureScreenshot = require('./lib/captureScreenshot');
var generateReport = require('./lib/generateReport');
var pages = require('./pages');
var imagesFolder = 'images/';

function screenshotHandler(err, data) {
  if (err) {
    console.error(err);
  } else {
    console.log(data.message);
  }
}

if (!action) {
  console.log('Please choose action');
  console.log('Use "capture" to capture screenshots');
  console.log('Use "compare" to compare screenshots and generate error report');
}

if (action === 'capture') {
  pages.forEach(function(page) {
    captureScreenshot({filename: imagesFolder + page.nameOriginal, url:page.urlOriginal}, screenshotHandler);
    captureScreenshot({filename: imagesFolder + page.nameNew, url:page.urlNew}, screenshotHandler);
  });
}

if (action === 'compare') {
  var options = {
    pages: pages,
    imagesFolder: imagesFolder,
    verbose: true
  };
  generateReport(options, function(error, data){
    if (error) {
      console.error(error);
    } else {
      console.log(data);
    }
  });
}
