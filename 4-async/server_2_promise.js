var http = require('http'),
    url = require('url');
var Q = require('q');

http.createServer(function (req, res) {
    var url_parts = url.parse(req.url);
    if(url_parts.pathname.substr(0, 5) == '/login') {
        Q.ninvoke('query', sql, 'SELECT 1 FROM users WHERE name = ?;', [ req.param('username') ])
        .then(function (rows) {
            if (rows.length < 1) {
                res.end('Wrong username!');
            } else {
                return Q.ninvoke('query', sql, 'SELECT 1 FROM users WHERE name = ? && password = MD5(?);', [ req.param('username'), req.param('password') ]);
            }
        })
        .then(function (rows) {
            if (rows.length < 1) {
                res.end('Wrong password!');
            } else {
                return Q.ninvoke('query', sql, 'SELECT * FROM userdata WHERE name = ?;', [ req.param('username') ]);
            }
        })
        .then(function (rows) {
            req.session.username = req.param('username');
            req.session.data = rows[0];
            res.rediect('/userarea');
        })
        .catch(function (error) {
            res.writeHead(500);
            res.end();
        })
        .done();
    }
}).listen(process.env.PORT, process.env.IP);
console.log('Server running.');