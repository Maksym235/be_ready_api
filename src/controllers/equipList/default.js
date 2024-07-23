const { EquipsListModel } = require('../../models/equipList')
const { EquipModel } = require('../../models/equip')
const { ToursModel } = require('../../models/tours')
const addDefaultList = async (req, res) => {
	const { id, variant } = req.body
	const defaultList = await EquipModel.find({})
	console.log(defaultList)
	let resp
	switch (variant) {
		case 0:
			resp = await EquipsListModel.findByIdAndUpdate(id, {
				list: defaultList
			})
			break
		case 1:
			resp = await EquipsListModel.findByIdAndUpdate(id, {
				list: []
			})
			break
		default:
			resp = await EquipsListModel.findByIdAndUpdate(id, {
				list: []
			})
	}
	if (variant === 0) {
	} else {
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
		code: 200,
		resp
	})
}

module.exports = addDefaultList
