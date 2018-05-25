const mitmproxy = require('node-mitmproxy');
const url = require('url');
const through = require('through2');
const DealWeiXin = require('./rules/weixin');
const tools = new DealWeiXin();
const config = require('../config.json');
const fs = require('fs');
const port = config.proxyServerPort;
mitmproxy.createProxy({
    port,
    sslConnectInterceptor: (req, cltSocket, head) => {
        return true;
    },
    requestInterceptor: (rOptions, req, res, ssl, next) => {
        const srvUrl = url.parse(`https://${req.url}`);
        if (srvUrl.pathname === '/userroll/userrolllist') {
            console.log(`正在抓取接口：${rOptions.method} ${rOptions.protocol}//${rOptions.hostname}:${rOptions.port}${rOptions.path}`);
        }
        next();
    },
    responseInterceptor: (req, res, proxyReq, proxyRes, ssl, next) => {
        const srvUrl = url.parse(`https://${req.url}`);
        if (srvUrl.pathname === '/userroll/userrolllist') {
            proxyRes.pipe(through(((chunk, enc, callback) => {
                tools.pushData(chunk.toString());
            })));
        }
        next();
    }
});
if (!fs.existsSync('./.buffer')) fs.mkdir('./.buffer');