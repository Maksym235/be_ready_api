const auth = require('./auth')
const validationBody = require('./validationBody')
const isValidId = require('./isValidId')
const uploads = require('./uploads')
module.exports = {
	authenticate: auth,
	validationBody,
	isValidId,
	uploads
}
