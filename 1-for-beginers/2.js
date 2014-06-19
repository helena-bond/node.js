var myModule = require('./myModule.js');

var r, area;

r = 5;
area = myModule.area(r);
console.log('area of circle with r = ' + r + ' is ' + area);