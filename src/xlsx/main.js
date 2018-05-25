const xlsx = require('node-xlsx');
const fs = require('fs');
const path = require('path');
module.exports = (title, data, filename) => {
    data = title.concat(data);
    for (let index in data) {
        if (index * 1 === 0) {
            continue;
        }
        data[index][0] = index;
    }
    const buffer = xlsx.build([{ name: filename, data: data }]); // Returns a buffer
    if (!fs.existsSync('out')) fs.mkdir('out');
    fs.writeFileSync(`out/${filename}.xlsx`, buffer);
    console.log(`--------------🌹 导出成功 🌹----------------`);
    console.log(`执行 open ${path.join(__dirname,'..','..')}/out/${filename}.xlsx 打开`);
}