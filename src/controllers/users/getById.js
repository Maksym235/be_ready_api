const { UserModel } = require('../../models/users')

const getUsersById = async (req, res) => {
	const { ids } = req.body
	const arrayOfId = ids.split(', ')
	console.log(arrayOfId)
	const testArray = ['66a0aa6f77f4e271141859fe']
	const resp = await UserModel.find(
		{ _id: { $in: arrayOfId } },
		{ name: 1, email: 1, _id: 1 }
	)
	res.json({
		code: 200,
		resp
	})
}

module.exports = getUsersById
