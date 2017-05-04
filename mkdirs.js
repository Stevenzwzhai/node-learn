const path = require('path');
const fs = require('fs');
//创建文件夹
// fs.mkdir(path.join(__dirname, 'demo2/demo3'), (err) => {
// 	console.log(err)
// });

function mkdirs(pathname, callback){
	//判断传入的是否是一个绝对路径
	pathname = path.isAbsolute(pathname)?pathname:path.join(__dirname, pathname);
	//D:\webstorm\node1\demo2\demo3
	//获取创建部分
	// pathname = pathname.replace(__dirname, '');
	let relativepath = path.relative(__dirname, pathname);

	let folders = relativepath.split(path.sep);
	//这里是阻塞的
	try{
		let pre = '';
		folders.forEach(folder => {
			fs.mkdirSync(path.join(__dirname, pre, folder));
			pre+=path.sep+folder;
			// pre = path.join(pre, folder);
		})	
		callback&&callback(null);
	}catch(error){
		callback&&callback(error);
	}
}
module.exports = mkdirs;