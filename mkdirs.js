const path = require('path');
const fs = require('fs');
//创建文件夹
// fs.mkdir(path.join(__dirname, 'demo2/demo3'), (err) => {
// 	console.log(err)
// });

function mkdirs(pathname, callback){
	//获取创建路径
	 let root = path.dirname(module.parent.filename);
	//判断传入的是否是一个绝对路径
	pathname = path.isAbsolute(pathname)?pathname:path.join(root, pathname);
	//D:\webstorm\node1\demo2\demo3
	
	//获取创建部分
	// pathname = pathname.replace(__dirname, '');
	let relativepath = path.relative(root, pathname);

	let folders = relativepath.split(path.sep);
	//这里是阻塞的
	try{
		let pre = '';
		folders.forEach(folder => {
			try{
				fs.stat(path.join(root, pre, folder));
				fs.mkdirSync(path.join(root, pre, folder));
			}catch(error){
			
			}
			
			pre+=path.sep+folder;
			// pre = path.join(pre, folder);
		})	
		callback&&callback(null);
	}catch(error){
		callback&&callback(error);
	}
}
module.exports = mkdirs;
