const { UserModel } = require('../../models/users')
const { HttpError } = require('../../helpers')
const sendFriendRequest = async (req, res) => {
	const { _id: currentUser, name } = req.user
	const { userid } = req.body
	const user = await UserModel.findById({ _id: userid })
	if (!user) {
		throw HttpError(404, 'User not found')
	}
	await UserModel.findByIdAndUpdate(
		{ _id: userid },
		{
			$push: { friendsRequest: { id: currentUser, name } }
		}
	)
	res.setHeader('Access-Control-Allow-Credentials', true)
	res.setHeader('Access-Control-Allow-Origin', '*')
	// another common pattern
	// res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
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
		message: 'request sended successfully'
	})
}

module.exports = sendFriendRequest
