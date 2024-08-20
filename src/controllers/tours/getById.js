const { ToursModel } = require('../../models/tours')
const { HttpError } = require('../../helpers')

const getById = async (req, res) => {
	const { id } = req.params
	const { filtered } = req.query
	// console.log(searchParams)
	const resp = await ToursModel.findById({ _id: id })
	console.log(resp)
	if (!resp) {
		throw new HttpError(404, 'trip not found')
	}
	if (JSON.parse(filtered)) {
		const filteredByCategory = resp.equipList.flat().reduce((acc, item) => {
			const category = item.category

			if (!acc[category]) {
				acc[category] = []
			}

			acc[category].push(item)
			return acc
		}, {})
		res.json({
			code: 200,
			trip: {
				id: resp._id,
				name: resp.name,
				users: resp.users,
				owner: resp.owner,
				duration: resp.duration,
				equipList: filteredByCategory
			}
		})
	}
	res.json({
		code: 200,
		trip: resp
	})
}

module.exports = getById
