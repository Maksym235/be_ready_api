const Joi = require('joi')

const addTourSchema = Joi.object({
	name: Joi.string().required(),
	duration: Joi.number().required(),
	listType: Joi.number().required()
})

const addUserstoTourSchema = Joi.object({
	usersId: Joi.string().required()
})

const updateEquipItem = Joi.object({
	equipId: Joi.string().required()
})

const addNewItem = Joi.object({
	name: Joi.string(),
	category: Joi.string(),
	description: Joi.string()
})
const Schema = {
	addTourSchema,
	addUserstoTourSchema,
	updateEquipItem,
	addNewItem
}

module.exports = Schema
