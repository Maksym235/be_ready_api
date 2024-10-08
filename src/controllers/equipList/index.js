const { controlWrapper } = require('../../helpers')
const createList = require('./add')
const addDefaultList = require('./default')
const getList = require('./getAll')
const addNewCategory = require('./addNewCategory')
const addNewItem = require('./addNewItem')
const updateList = require('./updateList')
module.exports = {
	createList: controlWrapper(createList),
	addDefaultList: controlWrapper(addDefaultList),
	getList: controlWrapper(getList),
	addNewCategory: controlWrapper(addNewCategory),
	addNewItem: controlWrapper(addNewItem),
	updateList: controlWrapper(updateList)
}
