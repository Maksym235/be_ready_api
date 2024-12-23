const express = require('express')
const router = express.Router()
const { validationBody, authenticate } = require('../middlewares')
const { Schema } = require('../models/tours')
const {
	addTour,
	addUserstoTour,
	getAllTours,
	deleteUser,
	updateEquipItem,
	getTripById,
	addNewItem,
	new_addTour,
	renameTrip,
	changeDuration,
	deleteTrip,
	getUsersInfo
} = require('../controllers/tours')

router.get('/', authenticate, getAllTours)

router.get('/:id', authenticate, getTripById)

router.post('/add', authenticate, validationBody(Schema.addTourSchema), addTour)

router.post(
	'/newAdd',
	authenticate,
	// validationBody(Schema.addTourSchema),
	new_addTour
)

router.post(
	'/:id/addUser',
	authenticate,
	validationBody(Schema.addUserstoTourSchema),
	addUserstoTour
)

router.get('/:id/usersInfo', authenticate, getUsersInfo)

router.post(
	'/:id/addNewItem',
	authenticate,
	// validationBody(Schema.addNewItem),
	addNewItem
)

router.post(
	'/:id/deleteUser',
	authenticate,
	validationBody(Schema.addUserstoTourSchema),
	deleteUser
)

router.patch(
	'/:id/updateItem',
	authenticate,
	validationBody(Schema.updateEquipItem),
	updateEquipItem
)

router.post(
	'/:id/rename',
	authenticate,
	validationBody(Schema.renameTrip),
	renameTrip
)

router.post(
	'/:id/changeDuration',
	authenticate,
	validationBody(Schema.changeDurationTrip),
	changeDuration
)

router.delete('/:id/delete', authenticate, deleteTrip)
module.exports = router
