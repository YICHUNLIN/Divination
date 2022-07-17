const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);

/**
 * @param app   {express} express 模組
 * @param mids  {array of mid} 中間處理的注入
 */
module.exports = (app, mids) => {
    const prefix = path.basename(__dirname);
    console.log(`=== Load '${prefix}' Router ===`);
    // 動態載入模組
    fs.readdirSync(__dirname)
    .filter(file =>  (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
    .forEach(file => {
        // router 檔案名稱就是 route 名
        const name = file.replace(file.slice(-3), '');
        const t_routeModule = require(`./${file}`);
        if (t_routeModule) {
            app.use(`${process.env.prefix}/${prefix}/${name}`, mids, t_routeModule);
            console.log(`Load /${name}`);
        }
    });
}