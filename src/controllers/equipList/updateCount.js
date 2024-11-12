const { EquipsListModel } = require('../../models/equipList')
const { HttpError } = require('../../helpers')

const updateCount = async (req, res) => {
	const { _id: userId } = req.user
	const { count: newCount, equipId, category } = req.body
	const { id: listId } = req.params
	const list = await EquipsListModel.findById({ _id: listId })
	if (!list) {
		throw HttpError(404, 'list not found')
	}
	let newList = list.list
	let newCategory = newList.get(category)
	const listItem = newCategory.find((item) => String(item._id) === equipId)
	const person = listItem.persons.find(
		(el) => String(el._id) === String(userId)
	)
	const personIndex = listItem.persons.findIndex(
		(el) => String(el._id) === String(userId)
	)
	const newPerson = {
		_id: person._id,
		count: newCount
	}
	listItem.persons.splice(personIndex, 1, newPerson)

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
		message: 'Success count updated'
	})
}

module.exports = updateCount
