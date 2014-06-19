// reference the http module so we can create a webserver
var http = require('http'),
    url = require('url'),
    fs = require('fs');
var messages = ["testing"];
var clients = [];
http.createServer(function (req, res) {
    var url_parts = url.parse(req.url);
    console.log(url_parts);
    if(url_parts.pathname == '/') {
        fs.readFile('./nodejs/node-book/index.html', function(err, data) {
            res.writeHeader(200, {"Content-Type": "text/html"});
            res.end(data);
        });
    } else if(url_parts.pathname.substr(0, 5) == '/poll') {
        var count = url_parts.pathname.replace(/[^0-9]*/, '');
        console.log(count);
        if(messages.length > count) {
          res.end(JSON.stringify( {
            count: messages.length,
            append: messages.slice(count).join("\n")+"\n"
          }));
        } else {
          clients.push(res);
        }
    } else if(url_parts.pathname.substr(0, 5) == '/msg/') {
      // message receiving
      var msg = unescape(url_parts.pathname.substr(5));
      messages.push(msg);
      while(clients.length > 0) {
        var client = clients.pop();
        client.end(JSON.stringify( {
          count: messages.length,
          append: msg+"\n"
        }));
      }
      res.end();
    }
}).listen(process.env.PORT, process.env.IP);
console.log('Server running.');

//}).listen(process.env.PORT, process.env.IP);

// Note: when spawning a server on Cloud9 IDE, 
// listen on the process.env.PORT and process.env.IP environment variables

// Click the 'Run' button at the top to start your server,
// then click the URL that is emitted to the Output tab of the console