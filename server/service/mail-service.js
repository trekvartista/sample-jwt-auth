const nodemailer = require('nodemailer');

class MailService {

	constructor() {
		this.transporter = nodemailer.createTransport({
			host: process.env.MAIL_HOST,
			port: process.env.MAIL_PORT,
			secure: false,
			auth: {
				user: process.env.MAIL_USER,
				pass: process.env.MAIL_PASSWORD
			}
		})
	}
	async sendActivationMail(email, activationLink) {
		await this.transporter.sendMail({
			from: process.env.MAIL_USER,
			to: email,
			subject: process.env.API_URL + ' account activation',
			html: `<p>Please click on the following link to activate your account:</p>`
				+ `<p><a href="${activationLink}">${activationLink}</a></p>`
		})
	}

}

module.exports = new MailService();