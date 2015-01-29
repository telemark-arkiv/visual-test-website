'use strict';

var fs = require('fs');
var events = require('events');
var stream = require('stream');
var resemble = require('node-resemble-js');
var mkCsvFromArray = require('./mkcsvfromarray');
var tracker = new events.EventEmitter();
var jobCounter = 0;
var pagesCounter = 0;
var errors = [];
var reportHeaders = [
  'url',
  'isSameDimensions',
  'misMatchPercentage',
  'analysisTime',
  'diffImageFilename'
];
var fileName;
var writeStream;
var readStream;
var imagesFolder;
var verbose;

function generateReport(options, callback) {

  imagesFolder = options.imagesFolder || 'images/';
  verbose = options.verbose;
  fileName = options.fileName || 'report.csv';
  pagesCounter = options.pages.length;
  writeStream = fs.createWriteStream(fileName);
  readStream = stream.PassThrough();

  readStream.pipe(writeStream);

  readStream.push(mkCsvFromArray(reportHeaders));

  tracker.on('row', function(row) {
    if (row.length > 0) {
      readStream.push(mkCsvFromArray(row));
    }
    jobCounter++;
    if (verbose) {
      console.log(jobCounter);
    }
    if (jobCounter === pagesCounter) {
      tracker.emit('finished');
    }
  });

  tracker.on('finished', function() {
    return callback(null, {message: 'Finished!', pages: pagesCounter, errors: errors.length});
  });

  options.pages.forEach(function(page) {

    resemble(imagesFolder + page.nameOriginal)
      .compareTo(imagesFolder + page.nameNew).onComplete(function(data) {
        if (data.misMatchPercentage === '0.00') {
          if (verbose) {
            console.log('Perfect: ' + page.urlNew);
          }
          tracker.emit('row', []);
        } else {
          var diffImg = imagesFolder + page.nameOriginal + '.diff.png';
          var log = [];
          log.push(page.urlNew);
          log.push(data.isSameDimensions);
          log.push(data.misMatchPercentage);
          log.push(data.analysisTime);
          log.push(diffImg);
          data.getDiffImage().pack()
            .pipe(fs.createWriteStream(diffImg));
          errors.push({url: page.urlNew});
          tracker.emit('row', log);
        }
      });
  });
}

module.exports = generateReport;
