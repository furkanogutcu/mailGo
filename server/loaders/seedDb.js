const UserRole = require('../models/userRole');
const Subscriber = require('../models/subscriber');
const passwordHelper = require('../helpers/password');

const seed = async () => {
    const userRole = await UserRole.findOne({ name: 'Admin' });
    let adminId = null;
    if (!userRole) {
        const adminRole = new UserRole({
            name: 'Admin',
            description: 'Admin'
        });
        const adminRoleResult = await adminRole.save();
        adminId = adminRoleResult._id;
    } else {
        adminId = userRole._id;
    }

    const admin = await Subscriber.findOne({ email: 'mailgoadmin@mailgoadmin.com', firstName: 'ADMIN', lastName: 'ADMIN' });
    if (!admin) {
        const adminUser = new Subscriber({
            email: 'mailgoadmin@mailgoadmin.com',
            firstName: 'ADMIN',
            lastName: 'ADMIN',
            password: passwordHelper.passwordToHash('mailgoadmin123456'),
        });
        adminUser.roles.push(adminId);
        await adminUser.save();
    }
};

module.exports = {
    seed
};