const { ToursModel } = require('../../models/tours')
const { HttpError } = require('../../helpers')

const updateEquipItem = async (req, res) => {
	const { _id: ownerId } = req.user
	const { equipId } = req.body
	const { id: tripId } = req.params
	console.log(`id user:`, ownerId)
	console.log(`id equip:`, equipId)
	console.log(`id trip:`, tripId)
	const tour = await ToursModel.findOne({ id: tripId })
	if (!tour) {
		throw new HttpError(404, 'trip not found')
	}
	const equipList = tour.equipList[0]
	const equipitem = equipList.find((el) => String(el._id) === equipId)
	// const index = equipitem.persons.findIndex((el) => String(el) === ownerId)
	// console.log(index)
	// if (index !== -1) {
	// 	equipitem.persons.splice(index, 1)
	// 	return
	// }
	// equipitem.persons.push(ownerId)
	const index = equipitem.persons.findIndex(
		(el) => String(el) === String(ownerId)
	)
	console.log(equipitem.persons.map((el) => el))
	console.log(ownerId)
	if (index !== -1) {
		equipitem.persons.splice(index, 1)
	} else {
		equipitem.persons.push(ownerId)
	}
	console.log(equipitem)
	const itemindex = equipList.findIndex((el) => el.id === equipitem.id)
	equipList.splice(itemindex, 1, equipitem)

	const updatedTour = await ToursModel.findByIdAndUpdate(
		{ _id: tripId },
		{
			equipList: [equipList]
		},
		{ new: true }
	)
	console.log(updatedTour)
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
