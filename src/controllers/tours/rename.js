const { ToursModel } = require('../../models/tours')
const { HttpError } = require('../../helpers')

const rename = async (req, res) => {
	const { id: tripId } = req.params
	const { name: newName } = req.body

	const trip = await ToursModel.findById({ _id: tripId })

	if (!trip) {
		throw HttpError(404, 'Trip not found')
	}

	if (trip.name === newName) {
		throw HttpError(400, 'the name must be different')
	}
	// const tripName = trip.name
	await ToursModel.findByIdAndUpdate(
		{ _id: tripId },
		{
			name: newName
		},
		{
			new: true
		}
	)
	res.json({
		code: 200,
		message: 'Success renamed'
	})
}

module.exports = rename
