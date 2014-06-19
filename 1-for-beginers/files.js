var http = require("http");
var fs = require("fs");

http.createServer(function (request, response) {
	if(request.url == '/') {
		fs.readFile("test.txt", 'utf-8', function (error, data) {
			response.writeHead(200, {
				'Content-Type' : 'text/plain'
			});
			data = parseInt(data) + 1;
			fs.writeFile('test.txt', data);
			response.end('This page was refreshed: ' + data + ' times!');
		});
	} else {
		response.writeHead(404);
		response.end();
	}
}).listen(3000);