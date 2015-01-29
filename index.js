'use strict';

var fs = require('fs');
var action = process.argv[2];
var resemble = require('node-resemble-js');
var captureScreenshot = require('./lib/captureScreenshot');
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
  console.log('Use "compare" to compare screenshots');
}

if (action === 'capture') {
  pages.forEach(function(page) {
    captureScreenshot({filename: imagesFolder + page.nameOriginal, url:page.urlOriginal}, screenshotHandler);
    captureScreenshot({filename: imagesFolder + page.nameNew, url:page.urlNew}, screenshotHandler);
  });
}

if (action === 'compare') {
  pages.forEach(function(page) {
    resemble(imagesFolder + page.nameOriginal)
      .compareTo(imagesFolder + page.nameNew).onComplete(function(data) {
        console.log(data);
        data.getDiffImage().pack()
          .pipe(fs.createWriteStream(imagesFolder + page.nameOriginal + '.diff.png'));
      });
  });
}
