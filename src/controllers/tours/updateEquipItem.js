const { ToursModel } = require('../../models/tours')
const { HttpError } = require('../../helpers')

const updateEquipItem = async (req, res) => {
	const { _id: ownerId } = req.user
	const { equipId } = req.body
	const { id: tripId } = req.params
	const tour = await ToursModel.findOne({ _id: tripId })
	if (!tour) {
		throw new HttpError(404, 'trip not found')
	}
	console.log(tour)
	const equipList = tour.equipList[0]
	const equipitem = equipList.find((el) => String(el._id) === equipId)
	const indexItem = equipList.findIndex((el) => el._id === equipitem._id)
	const index = equipitem.persons.findIndex(
		(el) => String(el) === String(ownerId)
	)
	console.log(index)
	if (index !== -1) {
		equipList.splice(indexItem, 1)
		const updatedPersons = equipitem.persons.filter(
			(el) => String(el) !== String(ownerId)
		)
		equipitem.persons = updatedPersons
		const updatedList = [...equipList, equipitem]

		const updatedTour = await ToursModel.findByIdAndUpdate(
			{ _id: tripId },
			{
				equipList: [updatedList]
			},
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
		return res.json({
			code: 200,
			resp: updatedTour
		})
	}
	equipList.splice(indexItem, 1)
	equipitem.persons.push(ownerId)
	const updatedList = [...equipList, equipitem]

	const updatedTour = await ToursModel.findByIdAndUpdate(
		{ _id: tripId },
		{
			equipList: [updatedList]
		},
		{ new: true }
	)
	console.log(equipitem)
	// const updatedTour = await ToursModel.findByIdAndUpdate(
	// 	{ _id: tripId },
	// 	{
	// 		equipList: [equipList]
	// 	},
	// 	{ new: true }
	// )
	// console.log(updatedTour)
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
		resp: updatedTour
	})
}

module.exports = updateEquipItem
