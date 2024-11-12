const { EquipsListModel } = require('../../models/equipList')
const { HttpError } = require('../../helpers')

const updateEquipItem = async (req, res) => {
	const { _id: userId } = req.user
	const { equipId, category } = req.body
	const { id: listId } = req.params
	const list = await EquipsListModel.findById({ _id: listId })
	if (!list) {
		throw new HttpError(404, 'list not found')
	}
	let newList = list.list
	let newCategory = newList.get(category)
	const listItem = newCategory.find((item) => String(item._id) === equipId)
	const index = newCategory.findIndex(
		(item) => String(item._id) === String(equipId)
	)

	if (listItem.persons.find((el) => String(el._id) === String(userId))) {
		const updatedPersons = listItem.persons.filter(
			(item) => String(item._id) !== String(userId)
		)
		// console.log(updatedPersons)
		const newItem = {
			_id: listItem._id,
			name: listItem.name,
			description: listItem.description,
			persons: updatedPersons
		}

		newCategory.splice(index, 1, newItem)

		newList.set(category, newCategory)

		await EquipsListModel.findByIdAndUpdate(
			{ _id: listId },
			{
				list: newList
			},
			{
				new: true
			}
		)
		res.json({
			code: 200,
			message: 'Success updated'
		})
	}
	listItem.persons.push({
		_id: userId,
		count: 1
	})
	await EquipsListModel.findByIdAndUpdate(
		{ _id: listId },
		{
			list: newList
		},
		{
			new: true
		}
	)
	res.json({
		code: 200,
		message: 'Success updated'
	})
	// const equipItem = list.list.find((item) => String(item._id) === equipId)
	// const isIncludeUser = equipItem.persons.find(
	// 	(el) => String(el._id) === userId
	// )
	// if (!isIncludeUser) {
	//     const index =
	// }
}

module.exports = updateEquipItem
