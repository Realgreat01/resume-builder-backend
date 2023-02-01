const fs = require('fs');

fs.readFile('./documents/privacy-policy.txt', (err, data) => {
	if (err) console.log(err);
	console.log(data.toString());
});

module.exports = fs;
