const { UserModel } = require('../../models/users')
const { ToursModel } = require('../../models/tours')
const { HttpError } = require('../../helpers')
const editRequest = async (req, res) => {
	const { _id: userId } = req.user
	const { id: tripId } = req.params
	const { accept } = req.query
	// console.log('accept', accept)
	// console.log('user id', userId)
	// console.log('trip id', tripId)
	console.log(accept)
	const user = await UserModel.findById({ _id: userId })
	if (!user) {
		throw HttpError(404, `User not found`)
	}
	const trip = await ToursModel.findById({ _id: tripId })
	if (!trip) {
		throw HttpError(404, 'trip not found')
	}
	if (JSON.parse(accept)) {
		await ToursModel.findByIdAndUpdate(
			{ _id: tripId },
			{
				$push: { users: userId }
			}
		)
		await UserModel.findByIdAndUpdate(
			{ _id: userId },
			{
				$pull: { tripsRequest: { id: tripId } }
			}
		)
		return res.json({
			code: 200,
			message: 'Success accepted. User added to trip'
		})
	}
	await UserModel.findByIdAndUpdate(
		{ _id: userId },
		{
			$pull: { tripsRequest: { id: tripId } }
		}
	)

	res.json({
		code: 200,
		message: 'Success rejected'
	})
}

module.exports = editRequest
