module.exports = {
    dealData: (data) => {
        let list = [];
        for (let item of data.record) {
            // 只统计支出
            if (item.bill_type !== 1) {
                continue;
            }
            let buffer = [];
            buffer.push('');
            buffer.push(item.title);
            buffer.push(new Date(item.timestamp * 1000).toLocaleString());
            buffer.push(item.fee / 100);
            buffer.push(item.remark);
            buffer.push(item.pay_bank_name);
            list.push(buffer);
        }
        return list;
    },

    headerData: () => {
        const data = [
            ['序号', '花销方式', '时间', '金额', '备注', '支付方式'],
        ];
        return data;
    }
}