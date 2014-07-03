var sum = 0, number;
for(var k = 2; k < process.argv.length; k++) {
	if(k > 1) {
		sum += parseInt(process.argv[k]);
	}
}
console.log(sum);