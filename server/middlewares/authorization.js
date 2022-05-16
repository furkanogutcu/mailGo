const authorization = (...roles) => (req, res, next) => {
    const userRoles = req.user.roles.map(role => role.toLowerCase());
    const acceptedRoles = roles.map(roleName => roleName.toLowerCase());

    //Kullanıcı rollerinde hiç kabul edilen rollerden birisi var mı?
    const isAuthorized = userRoles.some(role => acceptedRoles.includes(role));
    if (isAuthorized) {
        next();
    } else {
        return res.status(403).json({ message: 'Not authorized' });
    }
};

module.exports = authorization;