var http = require("http");
var url = require("url");

http.createServer(function (request, response) {
	var _get = url.parse(request.url, true).query;
	response.writeHead(200, {
		'Content-Type' : 'text/plain'
	});
	response.end('Here is your data: ' + _get['data']);
}).listen(3000);