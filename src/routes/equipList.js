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
	deleteCategory
} = require('../controllers/equipList')
router.get('/', authenticate, getList)

router.post('/create', authenticate, createList)

router.post('/:id/update', authenticate, updateList)

router.post('/:id/addNewCategory', authenticate, addNewCategory)

router.post('/:id/deleteCategory', authenticate, deleteCategory)

router.post('/:id/addNewItem', authenticate, addNewItem)

router.post('/default', authenticate, addDefaultList)

module.exports = router
