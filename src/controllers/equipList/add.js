const { EquipsListModel } = require('../../models/equipList')
const { ToursModel } = require('../../models/tours')
const createList = async (req, res) => {
	const { tourId } = req.body
	const newList = {
		tourId,
		list: []
	}
	const resp = await EquipsListModel.create(newList)
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

module.exports = createList
