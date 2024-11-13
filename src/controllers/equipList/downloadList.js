const { EquipsListModel } = require('../../models/equipList')
const { HttpError } = require('../../helpers')

const downloadList = async (req, res) => {
	const { id: listId } = req.params
	const equipList = await EquipsListModel.findById({ _id: listId })

	const list = equipList.list
	for (let item of list.keys()) {
		const category = list.get(item)
		category.map((el) => {
			if (el.persons.length > 0) {
				el.persons = []
			}
			return el
		})
	}

	res.json({
		code: 200,
		list: list
	})
}
module.exports = downloadList
