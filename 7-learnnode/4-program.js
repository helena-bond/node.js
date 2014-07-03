var fs = require('fs');
var filename = process.argv[2];
fs.readFile(filename, 'utf8', function(err, data){
	if(!err) {
		var lines = data.split('\n');
		console.log(lines.length - 1);
	}
});