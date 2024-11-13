const { ToursModel } = require('../../models/tours')
const { HttpError } = require('../../helpers')
const { EquipModel } = require('../../models/equip')
const { EquipsListModel } = require('../../models/equipList')

const new_addTour = async (req, res) => {
	const { name, listType, duration, customData } = req.body
	const { _id: userId } = req.user
	const users = [userId]
	const equip = await EquipModel.find()
	const tour = await ToursModel.findOne({ name: name })
	if (tour && String(tour.owner) === String(userId)) {
		throw HttpError(400, 'tour already exists')
	}
	const createdTour = await ToursModel.create({
		name,
		users,
		owner: userId,
		duration
	})
	switch (listType) {
		case 0:
			const newEmptyList = {
				tourId: createdTour._id,
				categoriesIcons: [],
				list: {}
			}
			const createdEmptyList = await EquipsListModel.create(newEmptyList)
			const newEmptyTrip = await ToursModel.findByIdAndUpdate(
				{ _id: createdTour._id },
				{
					equipList: createdEmptyList._id
				},
				{ new: true }
			)
			res.json({
				newEmptyTrip
			})
			break
		case 1:
			const newList = {
				tourId: createdTour._id,
				categoriesIcons: equip.reduce((acc, item) => {
					if (!acc.find((el) => el.name === item.category)) {
						acc.push({
							name: item.category,
							icon: 'https://be-ready-api.vercel.app/static/category_icons/tent-svgrepo-com.svg'
						})
					}
					return acc
				}, []),
				list: equip.reduce((acc, item) => {
					if (!acc[item.category]) {
						acc[item.category] = []
					}
					acc[item.category].push(item)
					return acc
				}, {})
			}
			const createdList = await EquipsListModel.create(newList)
			const newTrip = await ToursModel.findByIdAndUpdate(
				{ _id: createdTour._id },
				{
					equipList: createdList._id
				},
				{ new: true }
			)
			res.json({
				newTrip
			})
			break
		case 2:
			const newCustomList = {
				tourId: createdTour._id,
				categoriesIcons: equip.reduce((acc, item) => {
					if (!acc.find((el) => el.name === item.category)) {
						acc.push({
							name: item.category,
							icon: 'https://be-ready-api.vercel.app/static/category_icons/tent-svgrepo-com.svg'
						})
					}
					return acc
				}, []),
				list: JSON.parse(customData)
			}
			const createdCustomList = await EquipsListModel.create(newCustomList)
			const newCustomTrip = await ToursModel.findByIdAndUpdate(
				{ _id: createdTour._id },
				{
					equipList: createdCustomList._id
				},
				{ new: true }
			)
			res.json({
				newCustomTrip
			})
		default:
			break
	}
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
		code: 200
	})
}

module.exports = new_addTour
