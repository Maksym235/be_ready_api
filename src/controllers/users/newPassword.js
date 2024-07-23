const { HttpError } = require('../../helpers')
const { UserModel } = require('../../models/users')
const bcrypt = require('bcrypt')
const newPassword = async (req, res) => {
	const { password, email } = req.body
	const user = await UserModel.findOne({ email: email })

	if (!user) {
		throw HttpError(404, 'User not found')
	}
	const hashPassword = await bcrypt.hash(password, 10)
	await UserModel.findByIdAndUpdate(user._id, { password: hashPassword })

	res.setHeader('Access-Control-Allow-Credentials', '*')
	// another common pattern
	res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*') //NOTE: I also tried res.setHeader("Access-Control-Allow-Origin", "*"); and didnt work
	res.setHeader(
		'Access-Control-Allow-Methods',
		'GET,OPTIONS,PATCH,DELETE,POST,PUT'
	)
	res.setHeader(
		'Access-Control-Allow-Headers',
		'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
	)
	if (req.method === 'OPTIONS') {
		res.status(200).end()
		return
	}

	res.json({
		code: 200,
		message: 'User updated successfully'
	})
}

module.exports = newPassword
