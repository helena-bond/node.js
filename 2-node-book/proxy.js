var http = require('http'),
    url = require('url');
var server = http.createServer(function(sreq, sres) {
  var url_parts = url.parse(sreq.url);
  var opts = {
    host: 'google.com',
    port: 80,
    path: url_parts.pathname,
    method: sreq.method,
    headers: sreq.headers
  };
  var creq = http.request(opts, function(cres) {
    sres.writeHead(cres.statusCode, cres.headers);
    cres.pipe(sres); // pipe client to server response
  });
  sreq.pipe(creq); // pipe server to client request
});
server.listen(process.env.PORT, process.env.IP);
console.log('Server running.');