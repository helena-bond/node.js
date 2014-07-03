var http = require('http');
var bl = require('bl');
var dataArray = [];

var request = function(index, array) {
	http.get(process.argv[index+2], function(response){
		response.setEncoding('utf8');
		response.pipe(bl(function (err, data) {
			array[index] = data.toString();
			index++;
			if(process.argv[index+2]) {
				request(index, array);
			} else {
				for(var i = 0; i < 3; i++){
					console.log(array[i]);
				}
			}
		}));
	});
};

request(0, dataArray);