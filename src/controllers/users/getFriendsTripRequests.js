const { UserModel } = require('../../models/users')
const { ToursModel } = require('../../models/tours')
const { HttpError } = require('../../helpers')

const getFriendsTripRequests = async (req, res) => {
	const { friends } = req.user
	const { id: tripId } = req.params
	const trip = await ToursModel.findById({ _id: tripId })
	const filteredIds = friends.filter(
		(el) => !trip.users.includes(String(el._id))
	)
	const friendsData = await UserModel.find({ _id: { $in: filteredIds } })
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
