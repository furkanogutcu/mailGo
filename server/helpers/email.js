var nodemailer = require('nodemailer');

class EmailHelper {
    #createTransporter() {
        return nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            auth: {
                user: process.env.EMAIL_AUTH_USER,
                pass: process.env.EMAIL_AUTH_PASS
            },
        });
    }

    isVerify() {
        return this.#createTransporter().verify();
    }

    async sendHtmlEmail(to, subject, html) {
        const transporter = this.#createTransporter();
        return transporter.verify().then(() => {
            return new Promise((resolve, reject) => {
                transporter.sendMail({
                    from: process.env.EMAIL_AUTH_USER,
                    to,
                    subject,
                    html
                }, (err, info) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(info);
                    }
                });
            });
        }).catch(() => {
            console.log('There is a problem with the email transporter. Please check the e-mail configuration.');
            throw new Error('There is a problem with the email transporter');
        });
    }

    createCampaignEmailContent(campaign, subscriber) {
        // Eğer ki uygulama domain'i düzgün yapılandırıldıysa yönlendirmeli link oluştur. Yoksa direkt kampanyanın linkini ver.
        const targetLink = (process.env.APP_DOMAIN && process.env.APP_DOMAIN !== '')
            ? `${process.env.APP_DOMAIN}/email/campaign/redirect/${campaign.id}&${subscriber._id}`
            : campaign.targetLink;
        return `
            <h1>${campaign.name}</h1>
            <hr width="100%">
            <h2>${campaign.description}</h2>
            <hr width="100%">
            <a href="${(targetLink.includes('http') || targetLink.includes('https') ? targetLink : 'https://' + targetLink)}">Kampanyaya gitmek için tıklayınız</a>
            <hr width="100%">
            <p><strong>Not:</strong> Bu maili ${campaign.category.name} kategorisine abone olduğunuz için aldınız.</p>
        `;
    }

    createRegisterEmailContent(email, password) {
        return `
            <h1>mailGo Hesabınız Başarıyla Oluşturuldu</h1>
            <hr width="100%">
            <h3>Kullanıcı bilgileriniz aşağıdadır</h3>
            <hr width="100%">
            <p>
                <h3><strong>E-posta:</strong> ${email}</h3>
                <h3><strong>Şifre:</strong> ${password}</h3>
            </p>
        `;
    }
}

module.exports = new EmailHelper();