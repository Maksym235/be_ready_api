const { ToursModel } = require('../../models/tours')
const { HttpError } = require('../../helpers')
const { EquipModel } = require('../../models/equip')
const addTour = async (req, res) => {
	const { name, listType } = req.body
	const { _id: user } = req.user
	const users = [user]
	const equip = await EquipModel.find()
	const tour = await ToursModel.findOne({ name: name })
	if (tour) {
		throw HttpError(400, 'tour already exists')
	}
	const equipList = []

	switch (listType) {
		case 0:
			break
		case 1:
			equipList.push(equip)
			break
		case 2:
			equipList.push({
				_id: '64a5de0ad6af75ef90616865',
				name: 'намет',
				description: '',
				category: 'база',
				persons: []
			})
			break
		default:
			break
	}
	const tourBody = {
		...req.body,
		equipList
	}
	const resp = await ToursModel.create({ ...tourBody, users, owner: user })
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
		code: 201,
		resp
	})
}

module.exports = addTour
