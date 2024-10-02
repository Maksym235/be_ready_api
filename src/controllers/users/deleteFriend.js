const { UserModel } = require('../../models/users')
const { HttpError } = require('../../helpers')
const deleteFriend = async (req, res) => {
	const { _id: userId, friends } = req.user
	const { id: friendId } = req.params
	const index = friends.findIndex((el) => String(el._id) === friendId)
	if (index === -1) {
		throw HttpError(400, 'User not found in friends list')
	}

	await UserModel.findByIdAndUpdate(
		{ _id: userId },
		{
			$pull: { friends: { _id: friendId } }
		}
	)
	res.json({
		code: 200,
		message: 'Friend deleted successfully'
	})
}

module.exports = deleteFriend
