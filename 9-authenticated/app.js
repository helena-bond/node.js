var express = require('express');
var app = express();

var isAuthenticated = function(req, res, next) {

	//just test
	//req.user = {authenticated: true};
	//check whether user object exists
	if(!req.user)
		res.redirect('/');
	// CHECK THE USER STORED IN SESSION FOR A CUSTOM VARIABLE
	// you can do this however you want with whatever variables you set up
	if (req.user.authenticated)
		return next();

	// IF A USER ISN'T LOGGED IN, THEN REDIRECT THEM SOMEWHERE
	res.redirect('/');
}

app.get('/', function(req, res) {
	res.send('you shall not pass!');
});
app.get('/hello', isAuthenticated, function(req, res) {
	res.send('look at me!');
});
app.listen(3000);