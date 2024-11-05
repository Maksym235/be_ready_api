const { EquipsListModel } = require('../../models/equipList')
const { HttpError } = require('../../helpers')

const deleteCategory = async (req, res) => {
	const { id: listid } = req.params
	const { name } = req.body
	const equipList = await EquipsListModel.findById({ _id: listid })
	if (!equipList) {
		throw new HttpError(404, 'List not found')
	}
	let newlist = equipList.list
	if (!newlist.get(name)) {
		throw HttpError(400, 'category not found')
	}
	newlist.delete(name)
	await EquipsListModel.findByIdAndUpdate(
		{ _id: listid },
		{ list: newlist },
		{ new: true }
	)
	res.json({
		code: 200,
		message: 'Category deleted successfully'
	})
}
module.exports = deleteCategory
