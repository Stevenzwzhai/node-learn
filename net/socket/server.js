//建立一个socket服务端

const net = require('net');

const server = net.createServer(socketConnect);
//当有客户端与我链接的时候出发
function socketConnect(socket){
    // var client = socket.address();   
    // console.log(client.address);
    //外部
    console.log(`${socket.remoteAddress}:${socket.remotePort} 进来了`)
    //监听socket有数据过来
    socket.write('welcome to here')
    socket.on('data', (chunck) => {
        console.log(chunck.toString());
        socket.write('server >你说啥')
    })

}



server.listen(4433, (err) => {
    //成功监听4433端口后执行
    if(err){
        console.log('端口被占用')
    }
});
