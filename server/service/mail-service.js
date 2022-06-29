const nodemailer = require('nodemailer');

class MailService {

	constructor() {
		this.transporter = nodemailer.createTransport({
			host: process.env.SMTP_HOST,
			port: process.env.SMTP_PORT,
			secure: false,
			auth: {
				user: process.env.SMTP_USER,
				pass: process.env.SMTP_PASSWORD
			}
		})
	}
	async sendActivationMail(email, activationLink) {
		await this.transporter.sendMail({
			from: process.env.SMTP_USER,
			to: email,
			subject: process.env.API_URL + ' account activation',
			html: `<p>Please click on the following link to activate your account:</p>`
				+ `<p><a href="${activationLink}">${activationLink}</a></p>`
		})
	}

}

module.exports = new MailService();