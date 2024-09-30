const { ToursModel } = require('../../models/tours')
const { HttpError } = require('../../helpers')
const { ObjectId } = require('mongodb')

const addNewItem = async (req, res) => {
	const { name, category, description } = req.body
	const { id } = req.params
	const trip = await ToursModel.findById({ _id: id })
	if (!trip) {
		throw HttpError(404, 'trip not found')
	}
	const newItem = {
		_id: new ObjectId(),
		name,
		category,
		description,
		persons: []
	}
	console.log(newItem)
	if ((trip.equipList.length = 0)) {
		await ToursModel.findByIdAndUpdate(
			{ _id: id },
			{ $push: [] },
			{ new: true }
		)
		const resp = await ToursModel.findByIdAndUpdate(
			{ _id: id },
			{ $push: [{ equipList: newItem }] },
			{ new: true }
		)
		res.json({
			code: 200,
			resp
		})
	}
	const resp = await ToursModel.findByIdAndUpdate(
		{ _id: id },
		{ $push: { equipList: newItem } },
		{ new: true }
	)
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
		resp
	})
}

module.exports = addNewItem
