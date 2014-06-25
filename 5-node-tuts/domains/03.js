var EventEmitter = require('events').EventEmitter;

var server = require('http').createServer();
server.on('request', function(req, res) {
  var ee = new EventEmitter();
  ee.emit('example', 1, 2, 3);
  ee.emit('error', new Error('something terrible has happened'));
  res.end('Thank you for using our service!');
});
server.listen(process.env.PORT, process.env.IP);