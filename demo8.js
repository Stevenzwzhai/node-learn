const path = require('path');
const fs = require('fs');
//目录树递归
let target = path.join(__dirname, process.argv[2]||'./');

function get(target, deep){
	var dirinfos = fs.readdirSync(target);
	var dirs = [];
	var files = [];
	let prefix = new Array(deep).join('│ ');
	dirinfos.forEach(info => {
		var stats = fs.statSync(path.join(target, info));
		if(stats.isFile()){
			files.push(info)
		}else{
			dirs.push(info);
		}
	})
	dirs.forEach(dir => {
		console.log(`${prefix}├─${dir}`);
		get(path.join(target, dir), deep+1)
	})

	let count = files.length-1;
	files.forEach(file => {
		console.log(`${prefix}${count--?'├─':'└─'}${file}`)
	})
	// deep++;
}
//├└└─│

get(target, 1)