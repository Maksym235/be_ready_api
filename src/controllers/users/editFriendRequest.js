const { UserModel } = require('../../models/users')

const editFriendRequest = async (req, res) => {
	const { _id: userId, friendsRequest } = req.user
	const { id: reqId } = req.params
	const { accept } = req.query

	console.log(friendsRequest)
	const request = friendsRequest.find((el) => String(el.id) === String(reqId))
	console.log(request)
	if (JSON.parse(accept)) {
		// await UserModel.findByIdAndUpdate(
		// 	{ _id: userId },
		// 	{
		// 		$push: { friends: request }
		// 		// $pull: { friendsRequest: request }
		// 	}
		// )
		return res.json({
			code: 200,
			message: 'Success accepted'
		})
	}
	await UserModel.findByIdAndUpdate(
		{ _id: userId },
		{
			$pull: { friendsRequest: request }
		}
	)

	res.json({
		code: 200,
		message: 'Success rejected'
	})
}

module.exports = editFriendRequest
