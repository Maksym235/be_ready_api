const { controlWrapper } = require('../../helpers')
const getAll = require('./getAll')
const addTour = require('./add')
const addUserstoTour = require('./addUser')
const deleteUser = require('./deleteUser')
const updateEquip = require('./updateEquipItem')
module.exports = {
	getAllTours: controlWrapper(getAll),
	addTour: controlWrapper(addTour),
	addUserstoTour: controlWrapper(addUserstoTour),
	deleteUser: controlWrapper(deleteUser),
	updateEquipItem: controlWrapper(updateEquip)
}
