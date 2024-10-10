const { EquipsListModel } = require('../../models/equipList')
const { HttpError } = require('../../helpers')

const updateList = async (req, res) => {
	const body = req.body
	const { id: equiplistId } = req.params
	const equipList = await EquipsListModel.findById({ _id: equiplistId })
	// console.log(data)
	if (!equipList) {
		throw HttpError(404, 'No equipList found')
	}
	await EquipsListModel.findByIdAndUpdate(
		{
			_id: equiplistId
		},
		{
			list: body
		}
	)
	res.json({
		code: 200,
		message: 'updated'
	})
}

module.exports = updateList
