const { UserModel } = require('../../models/users')
const { HttpError } = require('../../helpers')
const editFriendRequest = async (req, res) => {
	const { _id: userId, friendsRequest, name, avatarURL } = req.user
	const { id: reqId } = req.params
	const { accept } = req.query

	const request = friendsRequest.find((el) => String(el.id) === String(reqId))
	if (!request) {
		throw HttpError(400, 'requests is empty')
	}
	if (JSON.parse(accept)) {
		await UserModel.findByIdAndUpdate(
			{ _id: userId },
			{
				$push: {
					friends: {
						_id: request._id,
						name: request.name,
						avatar: request.avatar
					}
				},
				$pull: { friendsRequest: request }
			}
		)
		await UserModel.findByIdAndUpdate(
			{ _id: reqId },
			{
				$push: {
					friends: {
						_id: userId,
						name,
						avatar: avatarURL
					}
				}
			}
		)
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
