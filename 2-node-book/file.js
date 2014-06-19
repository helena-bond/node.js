var PathIterator = require('./pathiterator.js');
function findFile(path, searchFile, callback) {
  var pi = new PathIterator();
  pi.on('file', function(file, stats) {
    if(file == searchFile) {
      callback(undefined, file);
    }
  });
  pi.on('error', callback);
  pi.iterate(path);
}