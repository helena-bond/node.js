var fs = require('fs');
var filename = process.argv[2];

var file = fs.readFileSync(filename);
var st = file.toString();
var lines = st.split('\n');
console.log(lines.length - 1);