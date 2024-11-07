const { EquipsListModel } = require('../../models/equipList')
const { HttpError } = require('../../helpers')

const deleteItem = async (req, res) => {
	const { id: listid } = req.params
	const { itemid, category } = req.body
	const equipList = await EquipsListModel.findById({ _id: listid })

	if (!equipList) {
		throw HttpError(404, 'List not found')
	}

	const newList = equipList.list
	if (!newList.get(category)) {
		throw HttpError(404, 'Category not found')
	}
	if (!newList.get(category).find((el) => String(el._id) === String(itemid))) {
		throw HttpError(400, 'Item already exist')
	}
	// console.log(newList.get(category))

	newList.set(
		category,
		newList.get(category).filter((c) => String(c._id) !== String(itemid))
	)

	await EquipsListModel.findByIdAndUpdate(
		{ _id: listid },
		{
			list: newList
		},
		{
			new: true
		}
	)

	res.json({
		code: 200,
		message: 'Item deleted successfully'
	})
}

module.exports = deleteItem
