const { EquipsListModel } = require('../../models/equipList')
const { HttpError } = require('../../helpers')

const updateName = async (req, res) => {
	const { _id: userId } = req.user
	const { name: newName, equipId, category } = req.body
	const { id: listId } = req.params

	const list = await EquipsListModel.findById({ _id: listId })
	if (!list) {
		throw HttpError(404, 'list not found')
	}
	let newList = list.list
	let newCategory = newList.get(category)
	const listItem = newCategory.find((item) => String(item._id) === equipId)
	// const newItem = {
	// 	name: newName,
	// 	...listItem
	// }

	listItem.name = newName

	await EquipsListModel.findByIdAndUpdate(
		{ _id: listId },
		{
			list: newList
		},
		{
			new: true
		}
	)

	return res.json({
		code: 200,
		message: 'Success name updated'
	})
}

module.exports = updateName
