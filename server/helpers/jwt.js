const JWT = require('jsonwebtoken');

const getOptions = () => {
    //FIXME
    //Obje olarak .env'e erişemediğim için bu şekilde ayarları aldım.
    return {
        audience: process.env.JWT_AUDIENCE || 'www.github.com/furkanogutcu',
        issuer: process.env.JWT_ISSUER || 'www.github.com/furkanogutcu',
        expiresIn: process.env.JWT_EXP || '1d'
    };
};

const generateAccessToken = (user) => {
    return JWT.sign({ user }, process.env.JWT_ACCESS_SECRET, getOptions());
};

const generateRefreshToken = (user) => {
    return JWT.sign({ user }, process.env.JWT_REFRESH_SECRET, getOptions());
};

module.exports = {
    generateAccessToken,
    generateRefreshToken
};