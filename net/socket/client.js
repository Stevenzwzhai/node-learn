//建立一个socket客户端

const net = require('net');

const client = net.connect({port: 4433}, () => {
    // 'connect' listener
    // console.log('connected to server!');
    // client.write('world!\r\n');
    process.stdout.write('\nclient >')
    process.stdin.on('data', (chunck) => {
        if(chunck){
            client.write(`client say: ${chunck.toString().trim()}`)
           
        }
    })
});
client.on('data', (data) => {
    console.log('\n'+data.toString());
     process.stdout.write('\nclient >')
    // client.end();
});
client.on('end', () => {
    console.log('disconnected from server');
});