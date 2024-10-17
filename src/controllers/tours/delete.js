const { ToursModel } = require('../../models/tours')
const { HttpError } = require('../../helpers')

const deleteTrip = async (req, res) => {
	const { id: tripId } = req.params
	const trip = await ToursModel.findById({ _id: tripId })

	if (!trip) {
		throw HttpError(404, 'Trip not found')
	}

	await ToursModel.findByIdAndDelete({ _id: tripId })

	res.json({
		code: 200,
		message: 'Success removed'
	})
}

module.exports = deleteTrip
