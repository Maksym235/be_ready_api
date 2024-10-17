const { ToursModel } = require('../../models/tours')
const { HttpError } = require('../../helpers')

const changeDuration = async (req, res) => {
	const { id: tripId } = req.params
	const { duration: newDuration } = req.body

	const trip = await ToursModel.findById({ _id: tripId })

	if (!trip) {
		throw HttpError(404, 'Trip not found')
	}

	if (trip.duration === newDuration) {
		throw HttpError(400, 'the duration must be different')
	}
	// const tripName = trip.name
	await ToursModel.findByIdAndUpdate(
		{ _id: tripId },
		{
			duration: newDuration
		},
		{
			new: true
		}
	)
	res.json({
		code: 200,
		message: 'Success changed the duration'
	})
}

module.exports = changeDuration
