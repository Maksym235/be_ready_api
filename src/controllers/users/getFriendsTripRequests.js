const { UserModel } = require('../../models/users')
const { HttpError } = require('../../helpers')

const getFriendsTripRequests = async (req, res) => {
	const { friends } = req.user
	const { id: tripId } = req.params
	const ids = friends.map((el) => el._id)
	const friendsData = await UserModel.find({ _id: { $in: ids } })
	const isHasRequestFriends = friendsData.reduce((acc, item) => {
		acc.push({
			name: item.name,
			avatar: item.avatarURL,
			_id: item._id,
			invited: item.tripsRequest.find((el) => String(el.id) === String(tripId))
				? true
				: false
		})
		return acc
	}, [])
	res.json({
		code: 200,
		resp: isHasRequestFriends
	})
}

module.exports = getFriendsTripRequests
