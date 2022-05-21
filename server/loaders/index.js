const dbLoader = require('./db');
const seedDb = require('./seedDb');

//Tüm loader'ları tek bir fonksiyon üzerinden çalıştırmak için bunu yapıyoruz.
module.exports = () => {
    dbLoader.connectDb();
    seedDb.seed();
};