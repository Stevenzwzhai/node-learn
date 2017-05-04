const path = require('path');
const mkdirs = require('./mkdirs');

// mkdirs('demo2/demo3')
mkdirs(path.join(__dirname,'demo2/demo3'), (err) => {
	console.log(err);
})