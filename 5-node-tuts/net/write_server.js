var net = require("net");
var filePath = __dirname + '/logs.json';
var file = require("fs").createWriteStream(filePath, {flags: 'a'});
var JSONStream = require("json-stream");
var es = require("event-stream");

function identity(data){
    return data;
}

var source = es.mapSync(identity);

var stringifier = es.mapSync(function(data){
    return JSON.stringify(data) + '\n';
});

source
    .pipe(stringifier)
    .pipe(file);

var server = net.createServer();

server.on('connection', function(socket){
    console.log('got a new connection');
    var jsonStream = new JSONStream();
    socket
        .pipe(jsonStream)
        .pipe(source, {end: false});
});

server.listen(process.env.PORT, process.env.IP);

module.exports = source;