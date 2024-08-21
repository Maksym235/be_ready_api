const { UserModel } = require('../../models/users')

const getUsersById = async (req, res) => {
	const { ids } = req.body
	console.log(ids)
	console.log(ids.split(', '))
	if (!ids || !ids.length) {
		return res.json({
			code: 200,
			resp: []
		})
	}
	const arrayOfId = ids.split(', ')
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
