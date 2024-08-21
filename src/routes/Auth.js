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
	getRequests
} = require('../controllers/users')
const { authenticate, validationBody, isValidId } = require('../middlewares')
const { Schema } = require('../models/users')
router.post('/register', validationBody(Schema.register), register)

router.get('/login', login)

router.get('/getRequests', authenticate, getRequests)

router.patch('/updateTheme', authenticate, updateTheme)

router.patch('/updateLang', authenticate, updateLang)

router.get('/current', authenticate, current)

router.post('/logout', authenticate, logout)

router.put('/changePassword', changePassword)

router.post('/resetPassword', resetPassword)

router.post('/newpass', newPassword)

module.exports = router
