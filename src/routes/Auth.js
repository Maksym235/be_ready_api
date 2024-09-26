const express = require('express')
const router = express.Router()
const {
	login,
	register,
	logout,
	current,
	updateLang,
	updateTheme,
	resetPassword,
	changePassword,
	newPassword,
	getRequests,
	editRequests,
	getUsersById
} = require('../controllers/users')
const { authenticate, validationBody, isValidId } = require('../middlewares')
const { Schema } = require('../models/users')
const googleAuth = require('../controllers/users/googleLogin')
router.post('/register', validationBody(Schema.register), register)

router.get('/login', login)

router.get('/googleAuth', googleAuth)

router.get('/getRequests', authenticate, getRequests)

router.get('/editRequest/:id', authenticate, editRequests)

router.post('/getById', authenticate, getUsersById)

router.patch('/updateTheme', authenticate, updateTheme)

router.patch('/updateLang', authenticate, updateLang)

router.get('/current', authenticate, current)

router.post('/logout', authenticate, logout)

router.put('/changePassword', changePassword)

router.post('/resetPassword', resetPassword)

router.post('/newpass', newPassword)

module.exports = router
