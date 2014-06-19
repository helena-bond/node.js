var fs = require('fs'),
    EventEmitter = require('events').EventEmitter,
    util = require('util');

var PathIterator = function() { };

// augment with EventEmitter
util.inherits(PathIterator, EventEmitter);

// Iterate a path, emitting 'file' and 'directory' events.
PathIterator.prototype.iterate = function(path) {
  var self = this;
  this.statDirectory(function(fpath, stats) {
    if(stats.isFile()) {
      self.emit('file', fpath, stats);
    } else if(stats.isDirectory()) {
      self.emit('directory', fpath, stats);
      self.iterate(path+'/'+fpath);
    }
  });
};

// Read and stat a directory
PathIterator.prototype.statDirectory = function(path, callback) {
  fs.readdir(path, function (err, files) {
    if(err) { self.emit('error', err); }
    files.forEach(function(file) {
      var fpath = path+'/'+file;
      fs.stat(fpath, function (err, stats) {
        if(err) { self.emit('error', err); }
        callback(fpath, stats);
      });
    });
  });
};

module.exports = PathIterator;