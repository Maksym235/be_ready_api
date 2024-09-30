const { UserModel } = require('../../models/users')
const bcrypt = require('bcrypt')

const updateData = async (req, res) => {
	const { _id: userId } = req.user
	const { name, email, password, curPassword } = req.body
	console.log(
		bcrypt.compareSync(
			'1234321',
			'$2b$10$y95ihE8sr.yY6q0pZgiaGuNFn7hWnzo0iwa5x8A0TZX8PweF0fBSy'
		)
	)
	if (name) {
		const resp = await UserModel.findByIdAndUpdate(
			userId,
			{
				name: name
			},
			{
				new: true
			}
		)
		res.json({
			resp
		})
	} else if (email) {
		const resp = await UserModel.findByIdAndUpdate(
			userId,
			{
				email: email
			},
			{
				new: true
			}
		)
		res.json({
			resp
		})
	} else if (password) {
		const isValid = bcrypt.compareSync(curPassword, req.user.password)
		console.log(isValid)
		if (!isValid) {
			throw HttpError(400, 'Invalid password or email')
		}
		const hashPassword = bcrypt.hashSync(password, 10)
		const resp = await UserModel.findByIdAndUpdate(
			userId,
			{
				password: hashPassword
			},
			{ new: true }
		)
		// const resp = await UserModel.findByIdAndUpdate(
		// 	userId,
		// 	{
		// 		name: name
		// 	},
		// 	{
		// 		new: true
		// 	}
		// )
		res.json({
			resp
		})
	}
	res.json({
		code: 200,
		user
	})
}

module.exports = updateData
