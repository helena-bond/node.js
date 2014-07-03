var http = require('http');
var url = require('url');
var port = process.argv[2];

var server = http.createServer(function(request, response){
	if(request.method === 'GET'){
		var urlParts = url.parse(request.url);
		response.writeHeader(200, {"Content-Type": "application/json"});
		if(urlParts.pathname == '/api/parsetime') {
			var data = urlParts.query.split('=');
			var date = new Date(data[1]);
			response.end(JSON.stringify({
			      "hour": date.getHours(),
			      "minute": date.getMinutes(),
			      "second": date.getSeconds()
			    }
			));
		} else if(urlParts.pathname == '/api/unixtime') {
			var data = urlParts.query.split('=');
			var date = new Date(data[1]);
			response.end(JSON.stringify({"unixtime": date.getTime()}))
		}	
	}
	response.end();
});
server.listen(port);