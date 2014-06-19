var http = require('http');
var qs = require('querystring');
var options = {
    host: 'www.google.com',
    port: 80,
    path: '/'+'?'+qs.stringify({q: 'hello world'})
  };
http.createServer(function (request, res) {
    var req = http.get(options, function(response) {
      // handle the response
      var res_data = '';
      response.on('data', function(chunk) {
        res_data += chunk;
      });
      response.on('end', function() {
        console.log(res_data);
        res.writeHeader(200, {"Content-Type": "text/html"});
        res.end(res_data);
      });
    });
    req.on('error', function(e) {
      console.log("Got error: " + e.message);
    });
}).listen(process.env.PORT, process.env.IP);