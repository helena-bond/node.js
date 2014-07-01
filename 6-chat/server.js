var http = require('http');
var express = require('express'), app = express();
server = http.createServer(app).listen(3000)
var jade = require('jade');
var io = require('socket.io').listen(server);

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.set("view options", { layout: false });
//app.configure(function() { //deprecated
    app.use(express.static(__dirname + '/public'));
//});


app.get('/', function(req, res){
  res.render('home.jade');
});
//app.listen(3000);

io.sockets.on('connection', function (socket) {
    //our events
    socket.on('setPseudo', function (data) {
	    socket.broadcast.emit('setPseudo', {
	      pseudo: data
	    });
	});

	socket.on('message', function (message) {
		socket.broadcast.emit('message', {
	      message: { 'message' : message, pseudo : name }
	    });
	});
});