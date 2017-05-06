//markdown 文件自动转换
const path = require('path')
const fs = require('fs')
const marked = require('marked');

//接受需要转换的文件路径
const target = path.join(__dirname, process.argv[2]||'../README.md');
let template = `
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
	<tyle>{{{styles}}}</style>
</head>
<body>
	<div class="markdown">{{{content}}}}</div>
</body>
</html>
`;
//监视文件变化

fs.watchFile(target, (curr, prev) => {
	console.log(curr.size, prev.size);
	//判断文件有没有变化
	if(curr.mtime === prev.mtime){
		return false;
	}
	//读取文件转换为新的html
	fs.readFile(target, 'utf8', (err, data) => {
		if(err){
			throw err;
		}
		let html = marked(data);
		fs.readFile(path.join(__dirname,'./mark.css'), 'utf8', (err, css) => {
			if(err){
				throw err;
			}
			html = template.replace('{{{content}}}', html).replace('{{{styles}}}', css);
		})
		fs.writeFile(target.replace(path.extname(target), '.html'), html, 'utf8')
	})
})

