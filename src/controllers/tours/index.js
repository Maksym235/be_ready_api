const { controlWrapper } = require('../../helpers')
const getAll = require('./getAll')
const addTour = require('./add')
const addUserstoTour = require('./addUser')
const deleteUser = require('./deleteUser')
const updateEquip = require('./updateEquipItem')
const getById = require('./getById')
const new_addTour = require('./new_add')
// const addNewUser = require('./addNewItem')
const addNewItem = require('./addNewItem')
const rename = require('./rename')
const changeDuration = require('./changeDuration')
const deleteTrip = require('./delete')
const getUsersInfo = require('./getUsersInfo')
module.exports = {
	getAllTours: controlWrapper(getAll),
	addTour: controlWrapper(addTour),
	addUserstoTour: controlWrapper(addUserstoTour),
	deleteUser: controlWrapper(deleteUser),
	updateEquipItem: controlWrapper(updateEquip),
	getTripById: controlWrapper(getById),
	addNewItem: controlWrapper(addNewItem),
	new_addTour: controlWrapper(new_addTour),
	renameTrip: controlWrapper(rename),
	changeDuration: controlWrapper(changeDuration),
	deleteTrip: controlWrapper(deleteTrip),
	getUsersInfo: controlWrapper(getUsersInfo)
}
