const express = require('express')
const router = express.Router()
const { authenticate } = require('../middlewares')
const {
	createList,
	addDefaultList,
	getList,
	addNewCategory,
	addNewItem,
	updateList,
	deleteCategory,
	deleteItem,
	getCategoryIcons,
	updateEquipItem,
	updateCount,
	downloadList
} = require('../controllers/equipList')
router.get('/', authenticate, getList)

router.post('/create', authenticate, createList)

router.post('/:id/update', authenticate, updateList)

router.post('/:id/addNewCategory', authenticate, addNewCategory)

router.post('/:id/deleteCategory', authenticate, deleteCategory)

router.post('/:id/addNewItem', authenticate, addNewItem)

router.post('/:id/deleteItem', authenticate, deleteItem)

router.post('/:id/updateItem', authenticate, updateEquipItem)

router.post('/:id/updateCount', authenticate, updateCount)

router.post('/default', authenticate, addDefaultList)

router.get('/getIcons', authenticate, getCategoryIcons)

router.get('/:id/downloadList', authenticate, downloadList)

module.exports = router
