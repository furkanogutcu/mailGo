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
            throw new Error('There is a problem with the email transporter');
        });
    }

    createCampaignEmailContent(campaign) {
        // Eğer ki uygulama domain'i düzgün yapılandırıldıysa yönlendirmeli link oluştur. Yoksa direkt kampanyanın linkini ver.
        const targetLink = (process.env.APP_DOMAIN && process.env.APP_DOMAIN !== '')
            ? `${process.env.APP_DOMAIN}/email/campaign/redirect/${campaign.id}`
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
}

module.exports = new EmailHelper();