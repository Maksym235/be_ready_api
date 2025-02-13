const { controlWrapper } = require('../../helpers')
const createList = require('./add')
const addDefaultList = require('./default')
const getList = require('./getAll')
const addNewCategory = require('./addNewCategory')
const addNewItem = require('./addNewItem')
const updateList = require('./updateList')
const deleteCategory = require('./deleteCategory')
const deleteItem = require('./deleteItem')
const getCategoryIcons = require('./getCategoryIcons')
const updateEquipItem = require('./updateEquipItem')
const updateCount = require('./updateCount')
const updateName = require('./updateName')
const downloadList = require('./downloadList')
module.exports = {
	createList: controlWrapper(createList),
	addDefaultList: controlWrapper(addDefaultList),
	getList: controlWrapper(getList),
	addNewCategory: controlWrapper(addNewCategory),
	addNewItem: controlWrapper(addNewItem),
	updateList: controlWrapper(updateList),
	deleteCategory: controlWrapper(deleteCategory),
	deleteItem: controlWrapper(deleteItem),
	getCategoryIcons: controlWrapper(getCategoryIcons),
	updateEquipItem: controlWrapper(updateEquipItem),
	updateCount: controlWrapper(updateCount),
	downloadList: controlWrapper(downloadList),
	updateName: controlWrapper(updateName)
}
