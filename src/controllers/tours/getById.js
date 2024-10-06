const { ToursModel } = require('../../models/tours')
const { EquipsListModel } = require('../../models/equipList')
const { HttpError } = require('../../helpers')

const getById = async (req, res) => {
	const { id } = req.params
	// console.log(searchParams)
	const resp = await ToursModel.findById({ _id: id })
	console.log(resp)
	if (!resp) {
		throw new HttpError(404, 'trip not found')
	}
	const equipList = await EquipsListModel.findById({ _id: resp.equipList })
	res.json({
		code: 200,
		trip: {
			id: resp._id,
			name: resp.name,
			users: resp.users,
			owner: resp.owner,
			duration: resp.duration,
			equipList: equipList.list
		}
	})
}

module.exports = getById
