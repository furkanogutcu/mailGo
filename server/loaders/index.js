const dbLoader = require('./db');

//Tüm loader'ları tek bir fonksiyon üzerinden çalıştırmak için bunu yapıyoruz.
module.exports = () => {
    dbLoader.connectDb();
};