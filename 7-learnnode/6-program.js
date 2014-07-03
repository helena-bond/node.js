var module = require(__dirname +'/6-module.js');

module(process.argv[2], process.argv[3], function(err, data){
	if(!err) {
		data.forEach(function(value){
			console.log(value);
		})
	}
});