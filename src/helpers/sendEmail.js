const nodemailer = require('nodemailer')
const { EMAIL_SENDER, EMAIL_PASS } = process.env
const config = {
	host: 'smtp.ukr.net',
	port: 465,
	secure: true,
	auth: {
		user: EMAIL_SENDER,
		pass: EMAIL_PASS
	}
}

const transporter = nodemailer.createTransport(config)

const sendEmail = async (data) => {
	try {
		const email = { ...data, from: EMAIL_SENDER }
		await transporter.sendMail(email)
		return true
	} catch (error) {
		return error.message
	}
}

module.exports = sendEmail
