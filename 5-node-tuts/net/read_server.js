var net = require('net');
var JSONStream = require('json-stream');
var es = require('event-stream');
var pup = require('pup');

function alwaysReturnTrue() {
  return true;
}

module.exports = function(source) {
  var server = net.createServer();

  server.on('connection', function(socket) {
    var started = false;
    var filter;

    var stringifier = es.mapSync(function(data) {
      return JSON.stringify(data) + "\n";
    });


    function end() {
      pup.unpipe(source, filter);
      pup.unpipe(filter, stringifier);
      pup.unpipe(stringifier, socket);
      started = false;
    }

    var actions = {
      start: function(command) {
        if (started) return;

        if (command.filter) {
          command.filter = new Function('ev', command.filter);
        }
        if (! command.filter || typeof command.filter != 'function') {
          command.filter = alwaysReturnTrue;
        }

        filter = es.mapSync(function(event) {
          if (command.filter(event)) return event;
        });

        pup.pipe(source, filter);
        pup.pipe(filter, stringifier);
        pup.pipe(stringifier, socket);

        started = true;
      },

      stop: end
    };

    var jsonStream = new JSONStream();

    jsonStream.on('data', function(command) {
      var action = command.action;
      if (action && actions[action]) actions[action](command);
    });

    socket.pipe(jsonStream);

    socket.on('end', end);
  });

  server.listen(4001);
}