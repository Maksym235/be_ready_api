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
		switch (String(item._id)) {
			case String(item._id) === String(owner):
				acc.push({
					name: item.name,
					permision: 'owner'
				})
				break
			case String(item._id) === String(user):
				acc.push({
					name: item.name,
					permision: 'current user'
				})
				break
			default:
				acc.push({
					name: item.name,
					permision: ' user'
				})
				break
		}
		// if (String(item._id) === String(owner))
		// 	acc.push({
		// 		_id: item._id,
		// 		name: item.name,
		// 		avatar: item.avatarURL,
		// 		permision: 'owner'
		// 	})
		// if (String(item._id) === String(user))
		// 	acc.push({
		// 		_id: item._id,
		// 		name: item.name,
		// 		avatar: item.avatarURL,
		// 		permision: 'current user'
		// 	})
		// acc.push({
		// 	_id: item._id,
		// 	name: item.name,
		// 	avatar: item.avatarURL,
		// 	permision: 'user'
		// })
		return acc
	}, [])
	console.log(shortInfoUsers)
	res.json({
		code: 200
	})
}
module.exports = getUsersInfo
