const { ToursModel } = require('../../models/tours')
const { UserModel } = require('../../models/users')
const { HttpError } = require('../../helpers')
const getUsersInfo = async (req, res) => {
	const { _id: user } = req.user
	const { id: tripId } = req.params
	const trip = await ToursModel.findById({ _id: tripId })

	if (!trip) {
		throw HttpError(404, 'Trip not found')
	}

	const users = trip.users
	const owner = trip.owner
	const fullInfoUsers = await UserModel.find({ _id: { $in: users } })

	const shortInfoUsers = fullInfoUsers.reduce((acc, item) => {
		if (String(item._id) === String(owner)) {
			acc.push({
				_id: item._id,
				name: item.name,
				avatar: item.avatarURL,
				permision: 'owner'
			})
		} else if (String(item._id) === String(user)) {
			acc.push({
				_id: item._id,
				name: item.name,
				avatar: item.avatarURL,
				permision: 'current_user'
			})
		} else {
			acc.push({
				_id: item._id,
				name: item.name,
				avatar: item.avatarURL,
				permision: 'user'
			})
		}

		return acc
	}, [])
	console.log(shortInfoUsers)
	res.json({
		code: 200,
		users: shortInfoUsers
	})
}
module.exports = getUsersInfo
