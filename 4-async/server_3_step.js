var http = require('http'),
    url = require('url');
var step = require('step');

http.createServer(function (req, res) {
    var url_parts = url.parse(req.url);
    if(url_parts.pathname.substr(0, 5) == '/login') {
        step(
            function start() {
                sql.query('SELECT 1 FROM users WHERE name = ?;', [ req.param('username') ], this);
            },
            function checkUsername(error, rows) {
                if (error) {
                    res.writeHead(500);
                    return res.end();
                }
                if (rows.length < 1) {
                    res.end('Wrong username!');
                } else {
                    sql.query('SELECT 1 FROM users WHERE name = ? && password = MD5(?);', [ req.param('username'), req.param('password') ], this);
                }
            },
            function checkPassword(error, rows) {
                if (error) {
                    res.writeHead(500);
                    return res.end();
                }
                if (rows.length < 1) {
                    res.end('Wrong password!');
                } else {
                    sql.query('SELECT * FROM userdata WHERE name = ?;', [ req.param('username') ], this);
                }
            },
            function (error, rows) {
                if (error) {
                    res.writeHead(500);
                    return res.end();
                }
                req.session.username = req.param('username');
                req.session.data = rows[0];
                res.rediect('/userarea');
            }
        );
    }
}).listen(process.env.PORT, process.env.IP);
console.log('Server running.');