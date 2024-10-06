const { EquipsListModel } = require('../../models/equipList')
const { HttpError } = require('../../helpers')

const addNewCategory = async (req, res) => {
	const { id: listid } = req.params
	const { name } = req.body
	const equipList = await EquipsListModel.findById({ _id: listid })

	if (!equipList) {
		throw new HttpError(404, 'List not found')
	}
	let newlist = equipList.list
	if (newlist.get(name)) {
		throw HttpError(400, 'Category already exists')
	} else {
		newlist.set(name, [])
	}
	// await EquipsListModel.findByIdAndUpdate(
	// 	{ _id: listid },
	// 	{ list: newlist },
	// 	{ new: true }
	// )
	res.json({
		code: 200,
		message: 'Category added successfully'
	})
}

module.exports = addNewCategory
