const { HttpError } = require('../../helpers')
const { UserModel } = require('../../models/users')
const bcrypt = require('bcrypt')
const ChangePassword = async (req, res) => {
	const { password, email } = req.body
	const user = await UserModel.findOne({ email })
	if (!user) {
		throw HttpError(404, 'User not found')
	}
	const currentPassword = await bcrypt.compare(password, user.password)
	if (currentPassword) {
		throw HttpError(400, 'You entered the current password')
	}
	const hashPassword = await bcrypt.hash(password, 10)
	const result = await UserModel.findByIdAndUpdate(
		user._id,
		{
			password: hashPassword
		},
		{ new: true }
	)

	if (!result) {
		throw HttpError(404, 'Not Found')
	}
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
		message: 'success'
	})
	//   const result = await bcrypt.compare(password, user.password);
}

module.exports = ChangePassword
