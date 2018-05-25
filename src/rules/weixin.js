const deal_tools = require('./data.js');
const excel_tools = require('../xlsx/main');
const fs = require('fs');
const path = require('path');
const bufferDataPaht = path.join(__dirname, '../../.buffer/weidata.json');
const config = require('../../config.json');
class DealWeiXin {
    constructor() {
        this.sourceData = [];
    }

    pushData(data) {
        data = JSON.parse(data);
        const result = this.dealData(data);
        this.sourceData = this.sourceData.concat(result);
        fs.writeFileSync(bufferDataPaht, JSON.stringify(this.sourceData));
    }

    dealData(data) {
        if (data.ret_code * 1 === 0) {
            return deal_tools.dealData(data);
        } else {
            console.log(data.ret_code);
            console.log(data.ret_msg);
            throw '返回数据有误 请检查接口'
        }
    }

    finish() {
        const data = fs.readFileSync(bufferDataPaht);
        excel_tools(deal_tools.headerData(), JSON.parse(data.toString()), config.outputFileName);
    }
}

module.exports = DealWeiXin;