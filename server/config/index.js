const serverConfig = require('./server');

//Tüm config fonksiyonlarını tek bir fonksiyon üzerinden çalıştırılabilir hale getiriyoruz.
module.exports = () =>{
    serverConfig();
};