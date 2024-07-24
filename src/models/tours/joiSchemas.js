const Joi = require('joi')

const addTourSchema = Joi.object({
	name: Joi.string().required(),
	users: Joi.array().items(
		Joi.object({
			id: Joi.string().required()
		})
	),
	duration: Joi.number().required(),
	listType: Joi.number().required()
})

const addUserstoTourSchema = Joi.object({
	usersId: Joi.string().required()
})

const Schema = {
	addTourSchema,
	addUserstoTourSchema
}

module.exports = Schema
