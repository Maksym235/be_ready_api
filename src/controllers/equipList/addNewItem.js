const { EquipsListModel } = require('../../models/equipList')
const { HttpError } = require('../../helpers')
const { ObjectId } = require('mongodb')
const addNewItem = async (req, res) => {
	const { id: listid } = req.params
	const { category, name, description } = req.body

	const equipList = await EquipsListModel.findById({ _id: listid })

	if (!equipList) {
		throw HttpError(404, 'List not found')
	}
	const newItem = {
		_id: new ObjectId(),
		name,
		category,
		description,
		persons: []
	}
	const newList = equipList.list
	if (!newList.get(category)) {
		throw HttpError(404, 'Category not found')
	}
	if (newList.get(category).find((el) => el.name === name)) {
		throw HttpError(400, 'Item already exist')
	}

	newList.set(category, [...newList.get(category), newItem])

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
		message: 'Item added successfully'
	})
}

module.exports = addNewItem
