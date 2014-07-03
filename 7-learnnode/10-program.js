var net = require('net');

function addZero(i) {
	return (i < 10)? "0" + i: i;
}

var server = net.createServer(function (socket) {
	var date =  new Date();
	socket.end(date.getFullYear() + '-' + addZero(date.getMonth() + 1) + '-'  + addZero(date.getDate()) + 
		' '  + date.getHours() + ':'  + date.getMinutes() + '\n');
})
server.listen(process.argv[2]);