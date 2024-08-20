const { ToursModel } = require('../../models/tours')
const { HttpError } = require('../../helpers')

const getById = async (req, res) => {
	const { id } = req.params
	const resp = await ToursModel.findById({ _id: id })
	if (!resp) {
		throw new HttpError(404, 'trip not found')
	}
	res.json({
		code: 200,
		trip: resp
	})
}

module.exports = getById
