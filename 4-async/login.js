var util = require('util');
var EventEmitter = require("events").EventEmitter;
 
function Login(username, password) {
    function _checkForErrors(error, rows, reason) {
        if (error) {
            this.emit('error', error);
            return true;
        }
         
        if (rows.length < 1) {
            this.emit('failure', reason);
            return true;
        }
         
        return false;
    }
     
    function _checkUsername(error, rows) {
        if (_checkForErrors(error, rows, 'username')) {
            return false;
        } else {
            sql.query('SELECT 1 FROM users WHERE name = ? && password = MD5(?);', [ username, password ], _checkPassword);
        }
    }
     
    function _checkPassword(error, rows) {
        if (_checkForErrors(error, rows, 'password')) {
            return false;
        } else {
            sql.query('SELECT * FROM userdata WHERE name = ?;', [ username ], _getData);
        }
    }
     
    function _getData(error, rows) {
        if (_checkForErrors(error, rows)) {
            return false;
        } else {
            this.emit('success', rows[0]);
        }
    }
     
    function perform() {
        sql.query('SELECT 1 FROM users WHERE name = ?;', [ username ], _checkUsername);
    }
     
    this.perform = perform;
}
 
util.inherits(Login, EventEmitter);
module.exports = Login;