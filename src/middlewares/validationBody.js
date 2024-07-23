const { HttpError } = require('../helpers')

const validationBody = (schema) => {
	const func = (req, res, next) => {
		const { error } = schema.validate(req.body)
		if (error) {
			next(HttpError(400, 'body is not correct!'))
		}
		next()
	}

	return func
}

module.exports = validationBody
