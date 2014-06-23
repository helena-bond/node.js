var http = require('http'),
    url = require('url');
var Login = require('./login.js');

http.createServer(function (req, res) {
    var url_parts = url.parse(req.url);
    if(url_parts.pathname.substr(0, 5) == '/login') {
        var login = new Login(req.param('username'), req.param('password'));
        login.on('error', function (error) {
            res.writeHead(500);
            res.end();
        });
        login.on('failure', function (reason) {
            if (reason == 'username') {
                res.end('Wrong username!');
            } else if (reason == 'password') {
                res.end('Wrong password!');
            }
        });
        login.on('success', function (data) {
            req.session.username = req.param('username');
            req.session.data = data;
            res.redirect('/userarea');
        });
        login.perform();
    }
}).listen(process.env.PORT, process.env.IP);
console.log('Server running.');