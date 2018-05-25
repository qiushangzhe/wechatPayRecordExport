// pac 服务 0.0.0.0:9090

const http = require('http');
const ip = require('ip');
const fs = require('fs');
const path = require('path');
const config = require('../../config.json');
const myIp = ip.address();
const myPort = config.pacServerPort;

createPacFile();
const server = http.createServer(function(req, res) {
    const requestIp = req.connection.remoteAddress;
    console.log(`${new Date()}来自${requestIp}的设备 获取pac文件成功`);
    res.writeHead(200, { 'Content-Type': 'application/x-ns-proxy-autoconfig' });
    fs.createReadStream(__dirname + '/weixin.pac').pipe(res);
});

server.listen(myPort, myIp);
console.log('-----------------------------------------------');
console.log(`pac文件目录为${__dirname + '/weixin.pac'}`);
console.log(`pac服务开启成功 访问地址为 http://${myIp}:${myPort}`);
console.log('-----------------------------------------------');

function createPacFile() {
    const template = `function FindProxyForURL(url, host) {
        if (dnsDomainIs(host, "wx.tenpay.com")) {
            return "PROXY ${myIp}:${config.proxyServerPort}";
        }
    }`;
    fs.writeFileSync(path.join(__dirname, 'weixin.pac'), template);
}