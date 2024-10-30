const { ToursModel } = require('../../models/tours')
const { HttpError } = require('../../helpers')
const { UserModel } = require('../../models/users')
const addUserstoTour = async (req, res) => {
	const { _id: ownerId } = req.user
	const { usersId } = req.body
	const { id } = req.params
	const { invite } = req.query
	const trip = await ToursModel.findById({ _id: id })
	// const isUserOwner = await ToursModel.find({ _id: id })
	if (String(trip.owner) !== String(ownerId)) {
		throw HttpError(400, 'You can`t add persons to tour')
	}
	if (trip.users.includes(usersId)) {
		throw HttpError(400, 'user already exists')
	}
	const user = await UserModel.findById({ _id: usersId })
	if (!user) {
		throw HttpError(400, 'user not found')
	}
	if (JSON.parse(invite)) {
		await UserModel.findByIdAndUpdate(
			{ _id: usersId },
			{ $push: { tripsRequest: { id: id, name: trip.name } } }
		)
	} else {
		await UserModel.findByIdAndUpdate(
			{ _id: usersId },
			{ $pull: { tripsRequest: { id: id, name: trip.name } } }
		)
		res.json({
			code: 200,
			message: 'request canceled successfully'
		})
	}
	// const resp = await ToursModel.findByIdAndUpdate(
	// 	{ _id: id },
	// 	{ $push: { users: usersId } },
	// 	{ new: true }
	// )
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

module.exports = addUserstoTour
