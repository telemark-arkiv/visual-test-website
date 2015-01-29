'use strict';

function mkCsvRowFromArray(arr) {
  if (!Array.isArray(arr)) {
    return new Error('Invalid input. Expected an array.')
  } else {
    var a = arr.map(function(i) {
      return '"' + i + '"';
    });
    return a.join(',') + '\r\n';
  }
}

module.exports = mkCsvRowFromArray;