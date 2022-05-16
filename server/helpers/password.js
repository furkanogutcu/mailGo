const CryptoJs = require('crypto-js');

const passwordToHash = (plainPassword) => {
    const hashedSalt = CryptoJs.HmacSHA1(plainPassword, process.env.PASSWORD_HASH);
    return CryptoJs.HmacSHA256(plainPassword, hashedSalt).toString();
};

const validatePassword = (plainPassword, hashedPassword) => {
    const checkedPassword = passwordToHash(plainPassword);
    return checkedPassword === hashedPassword;
};

module.exports = {
    passwordToHash,
    validatePassword
};